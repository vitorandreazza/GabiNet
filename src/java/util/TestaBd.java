/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import javax.persistence.EntityManager;
import model.*;

public class TestaBd {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        EntityManager bd = JpaUtil.getEntityManager();
        
        try {
            Usuario user = new Usuario("ddddd", "1231");
            Atividade atividade = new Atividade("das", "dsa", "odassai", user);
            Cidadao cidadao = new Cidadao("33333333333", null, "aaaaaa", null, null, null, null, null, null, null, user);
            Atendimento atendimetno = new Atendimento("aaa", "aaaaaaa", user, cidadao);
            
            bd.getTransaction().begin();
            bd.persist(user);
            bd.persist(cidadao);
            bd.persist(atendimetno);
            //bd.persist(atividade);
            bd.getTransaction().commit();
            bd.close();
            
        } catch (Exception e) {
            System.out.println("Erro:" + e);
        }
    }    
}
