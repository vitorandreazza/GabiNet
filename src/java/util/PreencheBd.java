package util;

import java.util.Date;
import javax.persistence.EntityManager;
import model.*;

public class PreencheBd {

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
            user1.setNome("Joaozinho da Silva");
            user2.setNome("Juca Pereira");
            user3.setNome("Benedito");
            user1.setIdPai(null);
            user2.setIdPai(user1);
            user3.setIdPai(user1);
            Atividade atividade1 = new Atividade("Whey gratuito", "Projeto de Lei", null, user1);
            Atividade atividade2 = new Atividade("Trânsporte público gratuito para estudantes", "Projeto de Lei", null, user1);
            Atividade atividade3 = new Atividade("Cidadania Ituana para Joaquim Barbosa", "Moções", "Congrat", user1);
            Atividade atividade4 = new Atividade("Estudante paga meia no cinema", "Projeto de Lei", null, user1);
            Atividade atividade5 = new Atividade("Estudantes isentos de taxas", "Projeto de Lei", null, user4);
            Date d = new Date("10/10/1992");
            Cidadao cidadao1 = new Cidadao("11111111112", "João Ruy Barbosa", "joao@hotmail.com", d, "Rua das flores, nº20", "Vila Verde", "Casa", "13309010", "1140244222", "11999015898", user1);
            Cidadao cidadao2 = new Cidadao("11111111113", "Janaina da Silva", "jana@hotmail.com", d, "Rua das folhas, nº10", "Centro", "Casa", "13309012", "1140259322", "11999015897", user1);
            Cidadao cidadao3 = new Cidadao("11111111114", "Gustavo Oliveira", "gu.oliveira@gmail.com", d, "Rua Benedito, nº14", "Jardim das Rosas", "Casa", "13309013", "1140259323", "11999015898", user1);
            Cidadao cidadao4 = new Cidadao("11111111115", "Mariana Gonçalves da Silva", "mari@hotmail.com", d, "Rua 31 de Abril, nº100", "Centro", "Casa", "13309015", "1140259324", "11999015899", user1);
            Cidadao cidadao5 = new Cidadao("11111111116", "Gilberto Gomes da Costa", "gil.gomes@hotmail.com", d, "Avenida Galileu, nº105", "Centro", "Casa", "13309012", "1140259322", "11999015892", user4);


            Atendimento atendimento1 = new Atendimento("Trocar lâmpadas da rua das flores", "Acionar cpfl", user1, cidadao1);
            Atendimento atendimento2 = new Atendimento("Arrumar encanamento da rua das folhas", "Acionar Águas de Itu", user1, cidadao2);
            Atendimento atendimento3 = new Atendimento("Falta de remedios nos postos de saúde", "Verificar com àrea da saúde", user1, cidadao3);
            Atendimento atendimento4 = new Atendimento("Asfaltar pedaço rua 31 de abril", "Verificar", user1, cidadao4);
            Atendimento atendimento5 = new Atendimento("Retirar lixo da Avenida Galileu", "Acionar Cidade Limpa", user4, cidadao5);
            
            bd.getTransaction().begin();
            bd.persist(user1);
            bd.persist(user2);
            bd.persist(user3);
            bd.persist(user4);
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
            
//            Usuario u1 = new Usuario();
//            u1.setNome(nome);
            bd.close();
            
        } catch (Exception e) {
            System.out.println("Erro:" + e);
        }
    }    
}