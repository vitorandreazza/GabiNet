package model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

public class Atividade implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue
    private long nrAtividade;
    @Temporal(TemporalType.DATE)
    private Date dataAtividade;
    @Column(nullable = true, length = 200)
    private String ementa;
    @Column(nullable = false, length = 15)
    private String tipo;
    @Column(nullable = true, length = 10)
    private String tipoMocao;
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @PrePersist
    protected void onCreate() {
        dataAtividade = new Date();
    }

    public Atividade(long nrAtividade, String ementa, String tipo, String tipoMocao, Usuario usuario) {
        this.nrAtividade = nrAtividade;
        this.ementa = ementa;
        this.tipo = tipo;
        this.tipoMocao = tipoMocao;
        this.usuario = usuario;
    }

    public long getNrAtividade() {
        return nrAtividade;
    }

    public void setNrAtividade(long nrAtividade) {
        this.nrAtividade = nrAtividade;
    }

    public String getEmenta() {
        return ementa;
    }

    public void setEmenta(String ementa) {
        this.ementa = ementa;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getTipoMocao() {
        return tipoMocao;
    }

    public void setTipoMocao(String tipoMocao) {
        this.tipoMocao = tipoMocao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Date getDataAtividade() {
        return dataAtividade;
    }
}
