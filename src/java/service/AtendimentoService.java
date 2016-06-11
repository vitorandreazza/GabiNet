package service;

import java.util.*;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.Atendimento;

@Path("/{parameter: atendimentos}")
public class AtendimentoService {
    EntityManager bd = util.JpaUtil.getEntityManager();
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atendimento> listaTodos(@QueryParam("idPai")Long idPai) {
        ArrayList<Atendimento> atendimentos;
        String sql = "SELECT at FROM Atendimento at WHERE idUsuario = :idPai";
        Query q = bd.createQuery(sql);
        q.setParameter("idPai", idPai);
        atendimentos = (ArrayList<Atendimento>) q.getResultList();
        bd.close();
        return atendimentos;
    }
    
    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Atendimento listaPeloId(@PathParam("id") long id, @QueryParam("idPai") long idPai) {
        ArrayList<Atendimento> atendimentos;
        String sql = "SELECT a FROM Atendimento a WHERE a.id = :id AND idUsuario = :idPai";
        Query query = bd.createQuery(sql, Atendimento.class);
        query.setParameter("id", id);
        query.setParameter("idPai", idPai);
        atendimentos = (ArrayList<Atendimento>) query.getResultList();
        bd.close();
        return atendimentos.get(0);
    }
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response incluir(Atendimento atendimento) {
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