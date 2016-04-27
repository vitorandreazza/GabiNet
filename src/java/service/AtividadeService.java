package service;

import java.util.*;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import model.Atividade;

@Path("/{parameter: atividades}")
public class AtividadeService {

    /* Lista todas as Atividades */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atividade> listaTodos() {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atividade> atividades;
        String sql = "SELECT a FROM Atividades a";
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
        ArrayList<Atividade> listagem;
        Atividade atividade = null;
        String sql = "SELECT g FROM Atividades g WHERE g.id = :id";
        Query query = bd.createQuery(sql, Atividade.class);
        query.setParameter("id", id);
        listagem = (ArrayList<Atividade>) query.getResultList();
        for (Atividade linha : listagem) {
            atividade = new Atividade(linha.getEmenta(), linha.getTipo(), linha.getTipoMocao(), linha.getUsuario());
        }
        bd.close();
        return atividade;
    }

//    /* Lista Atividade por usuário */
//    @Path("{idUsuario}")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public Atividade listaPeloUsuario(@PathParam("idUsuario") long idUsuario) {
//        EntityManager bd = util.JpaUtil.getEntityManager();
//        ArrayList<Atividade> listagem;
//        Atividade atividade = null;
//        String sql = "SELECT g FROM Atividades g WHERE g.idUsuario = :idUsuario";
//        Query query = bd.createQuery(sql, Atividade.class);
//        query.setParameter("idUsuario", idUsuario);
//        listagem = (ArrayList<Atividade>) query.getResultList();
//        for (Atividade linha : listagem) {
//            atividade = new Atividade(linha.getEmenta(), linha.getTipo(), linha.getTipoMocao(), linha.getUsuario());
//        }
//        bd.close();
//        return atividade;
//    }
//
//    /* Lista Atividade por data */
//    @Path("{data}")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public Atividade listaPorData(@PathParam("data") Date data) {
//        EntityManager bd = util.JpaUtil.getEntityManager();
//        ArrayList<Atividade> listagem;
//        Atividade atividade = null;
//        String sql = "SELECT g FROM Atividades g WHERE g.data = :data";
//        Query query = bd.createQuery(sql, Atividade.class);
//        query.setParameter("data", data, TemporalType.DATE);
//        listagem = (ArrayList<Atividade>) query.getResultList();
//        for (Atividade linha : listagem) {
//            atividade = new Atividade(linha.getEmenta(), linha.getTipo(), linha.getTipoMocao(), linha.getUsuario());
//        }
//        bd.close();
//        return atividade;
//    }
//
//    /* Lista Atividade por data de alteracao */
//    @Path("{dataAlteracao}")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public Atividade listaPorDataAlt(@PathParam("dataAlteracao") Date dataAlteracao) {
//        EntityManager bd = util.JpaUtil.getEntityManager();
//        ArrayList<Atividade> listagem;
//        Atividade atividade = null;
//        String sql = "SELECT g FROM Atividades g WHERE g.dataAlteracao = :dataAlteracao";
//        Query query = bd.createQuery(sql, Atividade.class);
//        query.setParameter("dataAlteracao", dataAlteracao, TemporalType.DATE);
//        listagem = (ArrayList<Atividade>) query.getResultList();
//        for (Atividade linha : listagem) {
//            atividade = new Atividade(linha.getEmenta(), linha.getTipo(), linha.getTipoMocao(), linha.getUsuario());
//        }
//        bd.close();
//        return atividade;
//    }
//
//    /* Lista Atividade por intervalo de data */
//    @Path("{inicio/fim}")
//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public Atividade listaPorDataInt(@PathParam("datas") Date dataInicio, Date dataFim) {
//        EntityManager bd = util.JpaUtil.getEntityManager();
//        ArrayList<Atividade> listagem;
//        Atividade atividade = null;
//        String sql = "SELECT g FROM Atividade g WHERE g.data BETWEEN :dataInicio AND :dataFim";
//        Query query = bd.createQuery(sql, Atividade.class);
//        query.setParameter("dataInicio", dataInicio, TemporalType.DATE);
//        query.setParameter("dataFim", dataFim, TemporalType.DATE);
//        listagem = (ArrayList<Atividade>) query.getResultList();
//        for (Atividade linha : listagem) {
//            atividade = new Atividade(linha.getEmenta(), linha.getTipo(), linha.getTipoMocao(), linha.getUsuario());
//        }
//        bd.close();
//        return atividade;
//    }
//
//    /* Deleta Atividade */
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
        try {
            bd.getTransaction().begin();
            bd.persist(atividade); //Hibernate gera o insert
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
