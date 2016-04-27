package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name = "Atendimentos")
public class Atendimento implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    private long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataAtendimento;
    @Column(nullable = true, length = 200)
    private String solicitacao;
    @Column(nullable = true, length = 200)
    private String providencia;
    @Column(nullable = true, length = 200)
    private String retorno;
    @ManyToOne
    @JoinColumn(nullable = false, name = "idUsuario")
    private Usuario usuario;
    @ManyToOne
    @JoinColumn(nullable = false, name = "cpfCidadao")
    private Cidadao cidadao;
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date dataCriacao;
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataAlteracao;
    
    public Atendimento() {}

    public Atendimento(String solicitacao, String providencia, Usuario usuario, Cidadao cidadao) {
        this.solicitacao = solicitacao;
        this.providencia = providencia;
        this.usuario = usuario;
        this.cidadao = cidadao;
    }
    
    @PrePersist
    protected void onCreate() {
        dataAtendimento = new Date();
        //dataCriacao = new Date();
    }
    
    @PreUpdate
    protected void onUpdate() {
        dataAlteracao = new Date();
    }
    
    public String getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(String solicitacao) {
        this.solicitacao = solicitacao;
    }

    public String getProvidencia() {
        return providencia;
    }

    public void setProvidencia(String providencia) {
        this.providencia = providencia;
    }

    public String getRetorno() {
        return retorno;
    }

    public void setRetorno(String retorno) {
        this.retorno = retorno;
    }

    public Cidadao getCidadao() {
        return cidadao;
    }

    public long getId() {
        return id;
    }

    public Date getDataAtendimento() {
        return dataAtendimento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

//    public Date getDataCriacao() {
//        return dataCriacao;
//    }

    public Date getDataAlteracao() {
        return dataAlteracao;
    }
}
