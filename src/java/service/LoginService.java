package service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.Usuario;
import util.JpaUtil;

@Path("/{parameter: login}")
public class LoginService {
    EntityManager bd = JpaUtil.getEntityManager();
    @Path("{login}/{senha}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public boolean validarLogin(@PathParam("login") String login, @PathParam("senha") String senha) throws NoSuchAlgorithmException, UnsupportedEncodingException{
        boolean retorno = false;
        String sql = "SELECT COUNT(u.login) FROM Usuario u WHERE u.login = :login AND u.senha = :senha";
        Query q = bd.createQuery(sql);
        q.setParameter("login", login);
        String senhaCriptografada = new util.Util().criptografa(senha);
        q.setParameter("senha", senhaCriptografada);
        Long quantidade = (Long) q.getSingleResult();
        if(quantidade > 0)
            retorno = true;
        bd.close();
        return retorno;
    }
    @Path("{login}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario getID(@PathParam("login") String login) {
        ArrayList<Usuario> usuario;
        String sql = "SELECT u FROM Usuario u WHERE u.login = :login";
        Query query = bd.createQuery(sql);
        query.setParameter("login", login);
        usuario =  (ArrayList<Usuario>) query.getResultList();
        bd.close();
        return usuario.get(0);
    };

    @Path("/nome")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario getNome(@QueryParam("idPai") Long idPai) {
        ArrayList<Usuario> usuario;
        String sql = "SELECT u FROM Usuario u WHERE u.id = :idPai";
        Query query = bd.createQuery(sql);
        query.setParameter("idPai", idPai);
        usuario = (ArrayList<Usuario>) query.getResultList();
        bd.close();
        return usuario.get(0);
    };
    
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response cadastrarLogin(Usuario user, @QueryParam("senha") String senha) {
        try {
            user.setSenha(senha);
            bd.getTransaction().begin();
            bd.persist(user); 
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
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Usuario> listaTodos(@QueryParam("idPai")Long idPai) {
        ArrayList<Usuario> usuarios;
        String sql = "SELECT u FROM Usuario u WHERE idPai.id = :id";
        Query q = bd.createQuery(sql);
        q.setParameter("id", idPai);
        usuarios = (ArrayList<Usuario>) q.getResultList();
        bd.close();
        return usuarios;
    }
    
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response excluir(@QueryParam("id") Long id) {
        try {
            Usuario usuario = bd.find(Usuario.class, id);
            bd.getTransaction().begin();
            bd.remove(usuario);
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
    @Path("{id}")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response alterar(Usuario usuario) {
        try {
            bd.getTransaction().begin();
            usuario = bd.merge(usuario);
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