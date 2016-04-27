package service;

import java.util.*;
import javax.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import model.Atendimento;

/**
 * 
 * @author Vitor Ferrari <vitorandreazza@hotmail.com>
 */
@Path("/{parameter: atendimentos}")
public class AtendimentoService {
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Atendimento> listaTodos() {
        EntityManager bd = util.JpaUtil.getEntityManager();
        ArrayList<Atendimento> atendimentos;
        String sql = "SELECT at FROM Atendimentos at";
        Query q = bd.createQuery(sql);
        atendimentos = (ArrayList<Atendimento>) q.getResultList();
        bd.close();
        return atendimentos;
    }
}
