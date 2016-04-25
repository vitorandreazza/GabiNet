/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package utils;

import java.sql.Date;
import javax.persistence.EntityManager;
import models.Atendimento;
import models.Atividade;
import models.Cidadao;
import models.Usuario;

public class TestaBd {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        EntityManager bd = JpaUtil.getEntityManager();
        
        try {
            Usuario user = new Usuario("jaxs", "123");
            Atividade atividade = new Atividade("das", "dsa", "odassai", user);
            Date dataN;
            dataN = new Date (20/02/1993);
            Cidadao cidadao = new Cidadao("12345678910", "jax21@hotmail.com", dataN, "rua das andorinhas 23", "andorinha", "casa", "13309000", user);

            bd.getTransaction().begin();
            bd.persist(user);
//            bd.persist(atividade);
            bd.persist(cidadao);
            bd.getTransaction().commit();
            bd.close();
            
        } catch (Exception e) {
            System.out.println("Erro:" + e);
        }
    }    
}
