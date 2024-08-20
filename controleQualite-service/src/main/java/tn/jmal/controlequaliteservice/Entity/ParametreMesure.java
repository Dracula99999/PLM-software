package tn.jmal.controlequaliteservice.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParametreMesure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "controle_qualite_id")
    private ControleQualiteEnCoursDeMelange controleQualite;

    private LocalDateTime dateEtHeure;
    private String natureEchantillon;
    private Double pH;
    private Double viscosite;
    private Double temperature;
    private String odeur;
    private String couleur;
    private String aspect;
    private Double densite;
    private Double detergentPourcentage;
    private Double DPH;
    private Double alcalilibre;
    private String autre;
    private String observations;
}
