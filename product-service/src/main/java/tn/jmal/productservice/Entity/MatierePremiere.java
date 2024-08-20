package tn.jmal.productservice.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatierePremiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Categorie categorie;

    private String article;
    private String fabricant;
    private String fournisseur;
    private String code;
    private int Nfamille;
    private String observation;

    private LocalDate dateReception;
    private String provenance;
    private String natureProduit;
    private String designation;
    private String codeERP;
    private String numLot;
    private String dlc;
    private String quantite;
    private String ph;
    private String densite;
    private String aspect;
    private String proprete;
    private String apparence;
    private String indiceRefraction;
    private String MMA;
    private String MAC;
    private String MANT;
    private String couleur;
    private String echelleIntensite;
    private String quantiteDeg;
    private String codeCouleur;
    private String decisionObservation;
    private String arrivageNum;


}
