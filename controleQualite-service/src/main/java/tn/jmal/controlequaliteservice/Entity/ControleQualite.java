package tn.jmal.controlequaliteservice.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ControleQualite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long matierePremiereId;
    private String designation;
    private LocalDate dateReception;
    private String tailleLot;
    private String unite;
    private LocalDate datePrelevement;
    private LocalDate dateAnalyse;
    private String operateur;
    private String acceptance;
    private LocalDate dateAcceptance;
    private String validatedBy;

}

