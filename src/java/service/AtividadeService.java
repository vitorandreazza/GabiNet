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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atividade> listaTodos(@QueryParam("idUsuario") Long idUsuario, @QueryParam("idPai")Long idPai) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atividade> atividades;
        String sql = "SELECT a FROM Atividade a WHERE idUsuario = :usuario OR idUsuario in (SELECT u.id FROM Usuario u WHERE u.idPai.id = :idPai OR u.id = :idU)";
        Query q = bd.createQuery(sql);
        q.setParameter("usuario", idUsuario);
        q.setParameter("idPai", idPai);
        q.setParameter("idU", idPai);
        atividades = (ArrayList<Atividade>) q.getResultList();
        bd.close();
        return atividades;
    }
  
    @Path("/grafico")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atividade> grafico(@QueryParam("de") Date de, @QueryParam("ate") Date ate, @QueryParam("idUsuario") long idUsuario, @QueryParam("idPai")Long idPai) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atividade> atividades;
        String sql = "SELECT a.tipo, count(a.tipo) FROM Atividade a WHERE (idUsuario = :usuario OR idUsuario in (SELECT u.id FROM Usuario u WHERE u.idPai.id = :idPai OR u.id = :idU)) AND a.dataAtividade BETWEEN :de AND :ate GROUP BY a.tipo";
        Query q = bd.createQuery(sql);
        q.setParameter("de", de);
        q.setParameter("ate", ate);
        q.setParameter("usuario", idUsuario);
        q.setParameter("idPai", idPai);
        q.setParameter("idU", idPai);
        atividades = (ArrayList<Atividade>) q.getResultList();
        bd.close();
        System.out.println(de);
        return atividades;
    }

    @Path("{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Atividade listaPeloId(@PathParam("id") long id, @QueryParam("idUsuario") Long idUsuario, @QueryParam("idPai")Long idPai) {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atividade> atividades;
        String sql = "SELECT a FROM Atividade a WHERE a.id = :id AND (idUsuario = :usuario OR idUsuario in (SELECT u.id FROM Usuario u WHERE u.idPai.id = :idPai OR u.id = :idU))";
        Query query = bd.createQuery(sql, Atividade.class);
        query.setParameter("id", id);
        query.setParameter("usuario", idUsuario);
        query.setParameter("idPai", idPai);
        query.setParameter("idU", idPai);
        atividades = (ArrayList<Atividade>) query.getResultList();

        bd.close();
        return atividades.get(0);
    }

    @Path("{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response excluir(@PathParam("id") long id) {
        EntityManager bd = util.JpaUtil.getEntityManager();
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
        EntityManager bd = util.JpaUtil.getEntityManager();
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
        EntityManager bd = util.JpaUtil.getEntityManager();
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