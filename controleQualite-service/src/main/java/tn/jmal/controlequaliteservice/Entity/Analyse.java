package tn.jmal.controlequaliteservice.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Analyse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "controleQualite_id")
    private ControleQualite controleQualite;

    private String aspect;
    private Double aspectValMax;
    private Double aspectValMin;
    private String aspectSpecification;
    private Double aspectValeurActuelle;
    private Double aspectResultat;

    private String couleur;
    private Double couleurValMax;
    private Double couleurValMin;
    private String couleurSpecification;
    private Double couleurValeurActuelle;
    private Double couleurResultat;

    private String odeur;
    private Double odeurValMax;
    private Double odeurValMin;
    private String odeurSpecification;
    private Double odeurValeurActuelle;
    private Double odeurResultat;

    private Double pH;
    private Double pHValMax;
    private Double pHValMin;
    private String pHSpecification;
    private Double pHValeurActuelle;
    private Double pHResultat;

    private Double indiceRefraction;
    private Double indiceRefractionValMax;
    private Double indiceRefractionValMin;
    private String indiceRefractionSpecification;
    private Double indiceRefractionValeurActuelle;
    private Double indiceRefractionResultat;

    private Double densite;
    private Double densiteValMax;
    private Double densiteValMin;
    private String densiteSpecification;
    private Double densiteValeurActuelle;
    private Double densiteResultat;

    private Double teneurEau;
    private Double teneurEauValMax;
    private Double teneurEauValMin;
    private String teneurEauSpecification;
    private Double teneurEauValeurActuelle;
    private Double teneurEauResultat;

    private Double resultatFr;
    private Double resultatFrValMax;
    private Double resultatFrValMin;
    private String resultatFrSpecification;
    private Double resultatFrValeurActuelle;
    private Double resultatFrResultat;

    private Double specMin;
    private Double specMax;
    private String unite;
}
