/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import javax.persistence.EntityManager;
import model.Atividade;
import model.Usuario;

public class TestaBd {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        EntityManager bd = JpaUtil.getEntityManager();
        
        try {
            Usuario user = new Usuario("dsadas", "1231");
            Atividade atividade = new Atividade("das", "dsa", "odassai", user);
            
            bd.getTransaction().begin();
            bd.persist(user);
            bd.persist(atividade);
            bd.getTransaction().commit();
            bd.close();
            
        } catch (Exception e) {
            System.out.println("Erro:" + e);
        }
    }    
}
