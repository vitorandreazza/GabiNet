package model;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import javax.persistence.*;
import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Table(name = "Usuarios")
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id @GeneratedValue
    private long id;
    
    @Column(nullable = false, length = 20, unique = true)
    private String login;
    @JsonIgnore // nao gerar essa coluna no json
    private String senha;

    public Usuario() {}
    
    public Usuario(String login, String senha) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        this.login = login;
        String senhaCriptografada = new util.Util().criptografa(senha);
        this.senha = senhaCriptografada;
    }
    
    public long getId() {
        return id;
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
