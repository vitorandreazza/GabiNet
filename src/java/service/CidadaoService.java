package service;

import java.util.*;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.Cidadao;

@Path("/{parameter: cidadaos}")
public class CidadaoService {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Cidadao> listaTodos(@QueryParam("idUsuario") Long idUsuario, @QueryParam("idPai")Long idPai) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Cidadao> cidadaos;
        String sql = "SELECT c FROM Cidadao c WHERE idUsuario = :usuario OR idUsuario in (SELECT u.id FROM Usuario u WHERE u.idPai.id = :idPai OR u.id = :idU)";
        Query q = bd.createQuery(sql);
        q.setParameter("usuario", idUsuario);
        q.setParameter("idPai", idPai);
        q.setParameter("idU", idPai);
        cidadaos = (ArrayList<Cidadao>) q.getResultList();
        bd.close();
        return cidadaos;
    }

    @Path("{cpf}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Cidadao listaPeloId(@PathParam("cpf") String cpf, @QueryParam("idUsuario") Long idUsuario, @QueryParam("idPai")Long idPai) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Cidadao> cidadaos;
        String sql = "SELECT c FROM Cidadao c WHERE c.cpf = :cpf AND (idUsuario = :usuario OR idUsuario in (SELECT u.id FROM Usuario u WHERE u.idPai.id = :idPai OR u.id = :idU))";
        Query query = bd.createQuery(sql, Cidadao.class);
        query.setParameter("cpf", cpf);
        query.setParameter("usuario", idUsuario);
        query.setParameter("idPai", idPai);
        query.setParameter("idU", idPai);
        cidadaos = (ArrayList<Cidadao>) query.getResultList();
        bd.close();
        return cidadaos.get(0);
    }

    @Path("{cpf}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response excluir(@PathParam("cpf") String cpf) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        try {
            Cidadao cidadao = bd.find(Cidadao.class, cpf);
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
        EntityManager bd = util.JpaUtil.getEntityManager();
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
        EntityManager bd = util.JpaUtil.getEntityManager();
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
}