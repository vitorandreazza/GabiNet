package service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.Cidadao;

@Path("/{parameter: cidadaos}")
public class CidadaoService {
    EntityManager bd = util.JpaUtil.getEntityManager();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Cidadao> listaTodos(@QueryParam("idPai")Long idPai) {
        ArrayList<Cidadao> cidadaos;
        String sql = "SELECT c FROM Cidadao c WHERE idUsuario = :idPai";
        Query q = bd.createQuery(sql);
        q.setParameter("idPai", idPai);
        cidadaos = (ArrayList<Cidadao>) q.getResultList();
        bd.close();
        return cidadaos;
    }

    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Cidadao listaPeloId(@PathParam("id") Long id, @QueryParam("idPai")Long idPai) {
        ArrayList<Cidadao> cidadaos;
        String sql = "SELECT c FROM Cidadao c WHERE c.id = :id AND idUsuario = :idPai";
        Query query = bd.createQuery(sql, Cidadao.class);
        query.setParameter("id", id);
        query.setParameter("idPai", idPai);
        cidadaos = (ArrayList<Cidadao>) query.getResultList();
        bd.close();
        return cidadaos.get(0);
    }

    @Path("{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response excluir(@PathParam("id") Long id) {
        try {
            Cidadao cidadao = bd.find(Cidadao.class, id);
            bd.getTransaction().begin();
            bd.remove(cidadao);
            bd.getTransaction().commit();
            return Response.status(Response.Status.OK).
                    entity("true").build();
        } catch (Exception e) {
            return Response.serverError().entity(e.getMessage()).
                    build();
        } finally {
            bd.close();
        }
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response incluir(Cidadao cidadao) {
        try {
            bd.getTransaction().begin();
            bd.persist(cidadao);
            bd.getTransaction().commit();
            return Response.status(Response.Status.OK).
                    entity("true").build();
        } catch (Exception e) {
            return Response.serverError().
                    entity(e.getMessage()).build();
        } finally {
            bd.close();
        }
    }

    @Path("{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response alterar(Cidadao cidadao) {
        try {
            bd.getTransaction().begin();
            cidadao = bd.merge(cidadao);
            bd.getTransaction().commit();
            return Response.status(Response.Status.OK)
                    .entity("true").build();
        } catch (Exception e) {
            return Response.serverError().
                    entity(e.getMessage()).build();
        } finally {
            bd.close();
        }
    }
    
    @Path("/aniversarios")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Cidadao> getAniversario(@QueryParam("de") Date de, @QueryParam("ate") Date ate, @QueryParam("idPai")Long idPai) {
        ArrayList<Cidadao> cidadaos;
        String sql = "SELECT c FROM Cidadao c WHERE idUsuario = :idPai AND (c.nascimento BETWEEN :de AND :ate)";
        Query query = bd.createQuery(sql, Cidadao.class);
        query.setParameter("idPai", idPai);
        query.setParameter("de", de);
        query.setParameter("ate", ate);
        cidadaos = (ArrayList<Cidadao>) query.getResultList();
        bd.close();
        return cidadaos;
    }
}