package service;

import java.util.*;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.Atendimento;

@Path("/{parameter: atendimentos}")
public class AtendimentoService {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atendimento> listaTodos(@QueryParam("id") Long idUsuario, @QueryParam("idPai")Long idPai) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atendimento> atendimentos;
        String sql = "SELECT at FROM Atendimento at WHERE idUsuario = :id OR idUsuario in (SELECT u.id FROM Usuario u WHERE u.idPai.id = :idPai OR u.id = :idU)";
        Query q = bd.createQuery(sql);
        q.setParameter("id", idUsuario);
        q.setParameter("idPai", idPai);
        q.setParameter("idU", idPai);
        atendimentos = (ArrayList<Atendimento>) q.getResultList();
        bd.close();
        return atendimentos;
    }
    
    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Atendimento listaPeloId(@PathParam("id") long id, @QueryParam("idUsuario") long idUsuario, @QueryParam("idPai") long idPai) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atendimento> atendimentos;
        String sql = "SELECT a FROM Atendimento a WHERE a.id = :id AND (idUsuario = :usuario OR idUsuario in (SELECT u.id FROM Usuario u WHERE u.idPai.id = :idPai OR u.id = :idU))";
        Query query = bd.createQuery(sql, Atendimento.class);
        query.setParameter("id", id);
        query.setParameter("usuario", idUsuario);
        query.setParameter("idPai", idPai);
        query.setParameter("idU", idPai);
        atendimentos = (ArrayList<Atendimento>) query.getResultList();

        bd.close();
        return atendimentos.get(0);
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response incluir(Atendimento atendimento) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        try {
            bd.getTransaction().begin();
            bd.persist(atendimento);
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
    public Response alterar(Atendimento atendimento) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        try {
            bd.getTransaction().begin();
            atendimento = bd.merge(atendimento);
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

    @Path("{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response excluir(@PathParam("id") long id) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        try {
            Atendimento atendimento = bd.find(Atendimento.class, id);
            bd.getTransaction().begin();
            bd.remove(atendimento);
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
}