package tn.jmal.form.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatierePremiereFormulation{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codeMP;
    private String alertes;
    private double pourcentage;
    private double quantite;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "formulation_id")
    private Formulation formulation;
}
