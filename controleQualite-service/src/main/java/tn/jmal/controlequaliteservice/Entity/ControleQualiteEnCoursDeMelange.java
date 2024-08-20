package tn.jmal.controlequaliteservice.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ControleQualiteEnCoursDeMelange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long matierePremiereId;
    private String designation;
    private Date dateDebutControl;
    private String malaxeur;
    private String numeroLot;
    private Double temperatureValidation;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "controleQualite")
    private ParametreMesure parametreMesure;

    private String acceptance;
    private String visaTechCQ;
    private String visaRespCQ;
    private Date dateCloture;
}
