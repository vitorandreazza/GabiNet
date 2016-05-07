package service;

import java.util.*;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import model.Atividade;
import model.Usuario;

@Path("/{parameter: atividades}")
public class AtividadeService {

    /* Lista todas as Atividades */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atividade> listaTodos() {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atividade> atividades;
        String sql = "SELECT a FROM Atividade a";
        Query q = bd.createQuery(sql);
        atividades = (ArrayList<Atividade>) q.getResultList();
        bd.close();
        return atividades;
    }

    /* Lista Atividade por id */
    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Atividade listaPeloId(@PathParam("id") long id) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atividade> atividades;
        Atividade atividade = null;
        String sql = "SELECT a FROM Atividade a WHERE a.id = :id";
        Query query = bd.createQuery(sql, Atividade.class);
        query.setParameter("id", id);
        atividades = (ArrayList<Atividade>) query.getResultList();
        //for (Atividade linha : atividades) {
            //atividade = new Atividade(linha.getEmenta(), linha.getTipo(), linha.getTipoMocao(), linha.getUsuario());
        //}
        bd.close();
        return atividades.get(0);
    }

    /* Deleta Atividade */
    @Path("{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response excluir(@PathParam("id") long id) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        try {
            //localizando o registro a ser removido
            Atividade atividade = bd.find(Atividade.class, id);
            bd.getTransaction().begin();
            bd.remove(atividade); //Hibernate efetua o delete
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

    /* Insere nova Atividade */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response incluir(Atividade atividade) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        Usuario u = new Usuario("atv", "hue");
        atividade.setUsuario(u);
        try {
            bd.getTransaction().begin();
            bd.persist(u);
            bd.getTransaction().commit();
            
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

    /* Altera Atividade */
    @Path("{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response alterar(Atividade atividade) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        try {
            bd.getTransaction().begin();
            atividade = bd.merge(atividade); //Hibernate gera o update
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