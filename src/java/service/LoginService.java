package service;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
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
    public Long getID(@PathParam("login") String login) {
        String sql = "SELECT u.id FROM Usuario u WHERE u.login = :login";
        Query query = bd.createQuery(sql);
        query.setParameter("login", login);
        Long idUsuario = (Long) query.getSingleResult();
        bd.close();
        return idUsuario;
    };
}