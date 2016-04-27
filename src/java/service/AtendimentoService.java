package service;

import java.util.*;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.Atendimento;
import model.Cidadao;
import model.Usuario;

/**
 *
 * @author Vitor Ferrari <vitorandreazza@hotmail.com>
 */
@Path("/{parameter: atendimentos}")
public class AtendimentoService {

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response incluir(Atendimento atendimento) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        Usuario u = new Usuario("teste", "hue");
        atendimento.setUsuario(u);
        Cidadao c = new Cidadao();
        c.setCpf("41278912387");
        c.setEmail("dasda");
        c.setUsuario(u);
        atendimento.setUsuario(u);
        atendimento.setCidadao(c);
        try {
            bd.getTransaction().begin();
            bd.persist(u);
            bd.persist(c);
            bd.getTransaction().commit();

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
            atendimento = bd.merge(atendimento); //Hibernate gera o update
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atendimento> listaTodos() {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atendimento> atendimentos;
        String sql = "SELECT at FROM Atendimento at";
        Query q = bd.createQuery(sql);
        atendimentos = (ArrayList<Atendimento>) q.getResultList();
        bd.close();
        return atendimentos;
    }

    @Path("{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response excluir(@PathParam("id") long id) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        try {
            //localizando o registro a ser removido
            Atendimento atendimento = bd.find(Atendimento.class, id);
            bd.getTransaction().begin();
            bd.remove(atendimento); //Hibernate efetua o delete
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
