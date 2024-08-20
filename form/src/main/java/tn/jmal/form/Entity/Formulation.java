package tn.jmal.form.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formulation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codeFormule;
    private String nomFormule;


    private String codeEssai;
    private LocalDate dateCreation;
    private double tailleEssai;
    private String unite;
    private Long formulatorID;

    private String stade;
    private LocalDate dateExpiration;
    private String objectif;
    private String notes;

    @OneToMany(mappedBy = "formulation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MatierePremiereFormulation> matieresPremieres;


}
