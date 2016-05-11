package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name = "Cidadaos")
public class Cidadao implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(nullable = false, length = 11, unique = true)
    private String cpf;
    @Column(nullable = true, length = 50)
    private String nome;
    @Column(nullable = true, length = 50, unique = true)
    private String email;
    @Column(nullable = true)
    @Temporal(TemporalType.DATE)
    private Date nascimento;
    @Column(nullable = true, length = 50)
    private String endereco;
    @Column(nullable = true, length = 25)
    private String bairro;
    @Column(nullable = true, length = 15)
    private String complemento;
    @Column(nullable = true, length = 8)
    private String cep;
    @Column(nullable = true, length = 10)
    private String telefone;
    @Column(nullable = true, length = 11)
    private String celular;
    @ManyToOne
    @JoinColumn(nullable = false, name = "idUsuario")
    private Usuario usuario;
    @Column(updatable = false)
    @Temporal(TemporalType.DATE)
    private Date dataCriacao;
    @Temporal(TemporalType.DATE)
    private Date dataAlteracao;

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    @PrePersist
    protected void onCreate() {
        dataCriacao = new Date();
    }
    
    @PreUpdate
    protected void onUpdate() {
        dataAlteracao = new Date();
    }
    
    public Cidadao() {}

    public Cidadao(String cpf, String nome, String email, Date nascimento, String endereco, String bairro, String complemento, String cep, String telefone, String celular, Usuario usuario) {
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.nascimento = nascimento;
        this.endereco = endereco;
        this.bairro = bairro;
        this.complemento = complemento;
        this.cep = cep;
        this.telefone = telefone;
        this.celular = celular;
        this.usuario = usuario;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getNascimento() {
        return nascimento;
    }

    public void setNascimento(Date nascimento) {
        this.nascimento = nascimento;
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

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public Date getDataAlteracao() {
        return dataAlteracao;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }
}
