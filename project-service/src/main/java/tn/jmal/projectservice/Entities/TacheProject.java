package tn.jmal.projectservice.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "TachesProjet")
@NoArgsConstructor
@AllArgsConstructor
public class TacheProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String categorie;

    private boolean applicable;

    private boolean nonapplicable;

    private String attribue;

    private int progression;

    private String jour;

    private String debut;

    @ManyToOne
    @JoinColumn(name = "projet_id")
    @JsonBackReference
    private Projet projet;

    @ManyToOne
    @JoinColumn(name = "tache_id")
    private Tache tache;
}
