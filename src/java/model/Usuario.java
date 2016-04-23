package model;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import javax.persistence.*;
import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id @GeneratedValue
    private long id;
    
    @Column(nullable = false, length = 20, unique = true)
    private String login;
    @JsonIgnore // nao gerar essa coluna no json
    private String senha;

    public Usuario(long id, String login, String senha) {
        this.id = id;
        this.login = login;
        this.senha = senha;
    }

    public Usuario() {
    }
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        String senhaCriptografada = new util.Util().criptografa(senha);
        this.senha = senhaCriptografada;
    }
}
