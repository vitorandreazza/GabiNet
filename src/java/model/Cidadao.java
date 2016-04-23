package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Entity
public class Cidadao implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(length = 11)
    private String cpf;
    @Column(nullable = true, length = 50, unique = true)
    private String email;
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dataNascimento;
    @Column(nullable = true, length = 50)
    private String endereco;
    @Column(nullable = true, length = 25)
    private String bairro;
    @Column(nullable = true, length = 15)
    private String complemento;
    @Column(nullable = true, length = 8)
    private String cep;
    @ManyToOne
    @JoinColumn(nullable = false, name = "idUsuario")
    private Usuario usuario;

    public Cidadao() {

    }

    public Cidadao(String cpf, String email, Date dataNascimento, String endereco, String bairro, String complemento, String cep, Usuario usuario) {
        this.cpf = cpf;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.bairro = bairro;
        this.complemento = complemento;
        this.cep = cep;
        this.usuario = usuario;
    }
    
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
