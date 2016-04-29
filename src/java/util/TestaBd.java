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
            Usuario user1 = new Usuario("user1", "1231");
            Usuario user2 = new Usuario("user2", "1231");
            Usuario user3 = new Usuario("user3", "1231");
            Usuario user4 = new Usuario("user4", "1231");
            Usuario user5 = new Usuario("user5", "1231");
            Atividade atividade1 = new Atividade("at1", "dsa", "odassai", user1);
            Atividade atividade2 = new Atividade("st2", "dsa", "odassai", user2);
            Atividade atividade3 = new Atividade("qt3", "dsa", "odassai", user3);
            Atividade atividade4 = new Atividade("a4", "dsa", "odassai", user4);
            Atividade atividade5 = new Atividade("bt5", "dsa", "odassai", user5);
            Cidadao cidadao1 = new Cidadao("11111111116", "joao", "ojpaa", null, null, null, null, null, null, null, user1);
            Cidadao cidadao2 = new Cidadao("11111111112", "marcos", "ojpaaa", null, null, null, null, null, null, null, user2);
            Cidadao cidadao3 = new Cidadao("11111111113", "gabire", "ojpaasaaa", null, null, null, null, null, null, null, user3);
            Cidadao cidadao4 = new Cidadao("11111111114", "lan", "ojpaaafa", null, null, null, null, null, null, null, user4);
            Cidadao cidadao5 = new Cidadao("11111111115", "wis", "ojpaaava", null, null, null, null, null, null, null, user5);
            Atendimento atendimento1 = new Atendimento("aten1", "lala", user1, cidadao1);
            Atendimento atendimento2 = new Atendimento("zten1", "lala", user2, cidadao2);
            Atendimento atendimento3 = new Atendimento("den1", "lala", user3, cidadao3);
            Atendimento atendimento4 = new Atendimento("dxen1", "lala", user4, cidadao4);
            Atendimento atendimento5 = new Atendimento("syen1", "lala", user5, cidadao5);
            
            bd.getTransaction().begin();
            bd.persist(user1);
            bd.persist(user2);
            bd.persist(user3);
            bd.persist(user4);
            bd.persist(user5);
            bd.persist(cidadao1);
            bd.persist(cidadao2);
            bd.persist(cidadao3);
            bd.persist(cidadao4);
            bd.persist(cidadao5);
            bd.persist(atendimento1);
            bd.persist(atendimento2);
            bd.persist(atendimento3);
            bd.persist(atendimento4);
            bd.persist(atendimento5);
            bd.persist(atividade1);
            bd.persist(atividade2);
            bd.persist(atividade3);
            bd.persist(atividade4);
            bd.persist(atividade5);
            bd.getTransaction().commit();
            bd.close();
            
        } catch (Exception e) {
            System.out.println("Erro:" + e);
        }
    }    
}