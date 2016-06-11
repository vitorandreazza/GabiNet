package service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import model.Atividade;

@Path("/{parameter : atividades}")
public class AtividadeService {
    EntityManager bd = util.JpaUtil.getEntityManager();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atividade> listaTodos(@QueryParam("idPai")Long idPai) {
        ArrayList<Atividade> atividades;
        String sql = "SELECT a FROM Atividade a WHERE idUsuario = :idPai";
        Query q = bd.createQuery(sql);
        q.setParameter("idPai", idPai);
        atividades = (ArrayList<Atividade>) q.getResultList();
        bd.close();
        return atividades;
    }
  
    @Path("/grafico")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atividade> grafico(@QueryParam("de") Date de, @QueryParam("ate") Date ate, @QueryParam("idPai")Long idPai) {
        ArrayList<Atividade> atividades;
        String sql = "SELECT a.tipo, count(a.tipo) FROM Atividade a WHERE idUsuario = :idPai AND a.dataAtividade BETWEEN :de AND :ate GROUP BY a.tipo";
        Query q = bd.createQuery(sql);
        q.setParameter("de", de);
        q.setParameter("ate", ate);
        q.setParameter("idPai", idPai);
        atividades = (ArrayList<Atividade>) q.getResultList();
        bd.close();
        System.out.println(de);
        return atividades;
    }

    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Atividade listaPeloId(@PathParam("id") long id, @QueryParam("idPai")Long idPai) {
        ArrayList<Atividade> atividades;
        String sql = "SELECT a FROM Atividade a WHERE a.id = :id AND idUsuario = :idPai";
        Query query = bd.createQuery(sql, Atividade.class);
        query.setParameter("id", id);
        query.setParameter("idPai", idPai);
        atividades = (ArrayList<Atividade>) query.getResultList();
        bd.close();
        return atividades.get(0);
    }

    @Path("{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response excluir(@PathParam("id") long id) {
        try {
            Atividade atividade = bd.find(Atividade.class, id);
            bd.getTransaction().begin();
            bd.remove(atividade);
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
    public Response incluir(Atividade atividade) {
        try {
            bd.getTransaction().begin();
            bd.persist(atividade); 
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
    public Response alterar(Atividade atividade) {
        try {
            bd.getTransaction().begin();
            atividade = bd.merge(atividade);
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