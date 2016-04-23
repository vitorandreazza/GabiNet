package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

public class Atendimento implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    private long nrAtendimento;
    @Temporal(TemporalType.DATE)
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

    @PrePersist
    protected void onCreate() {
        dataAtendimento = new Date();
    }

    public Atendimento() {

    }

    public Atendimento(long nrAtendimento, String solicitacao, String providencia, String retorno, Usuario usuario, Cidadao cidadao) {
        this.nrAtendimento = nrAtendimento;
        this.solicitacao = solicitacao;
        this.providencia = providencia;
        this.retorno = retorno;
        this.usuario = usuario;
        this.cidadao = cidadao;
    }

    public long getNrAtendimento() {
        return nrAtendimento;
    }

    public void setNrAtendimento(int nrAtendimento) {
        this.nrAtendimento = nrAtendimento;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Cidadao getCidadao() {
        return cidadao;
    }

    public void setCidadao(Cidadao cidadao) {
        this.cidadao = cidadao;
    }

    public Date getDataAtendimento() {
        return dataAtendimento;
    }
}
