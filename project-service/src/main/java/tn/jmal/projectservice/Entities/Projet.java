package tn.jmal.projectservice.Entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name ="Projets")
@NoArgsConstructor
public class Projet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numero;
    private String titre;
    private String categorie;
    private LocalDate dateDebut;
    private LocalDate debutReel;
    private Long dureeDuProjet;
    private Long dureeReel;
    private int avancement;
    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TacheProject> tachesProject = new ArrayList<>();

    public Projet(Long numero, String titre, String categorie, LocalDate dateDebut, LocalDate debutReel, Long dureeDuProjet, Long dureeReel, int avancement, List<TacheProject> tachesProject) {
        this.numero = numero;
        this.titre = titre ;
        this.categorie = categorie;
        this.dateDebut = dateDebut;
        this.debutReel = debutReel;
        this.dureeDuProjet = dureeDuProjet;
        this.dureeReel = dureeReel;
        this.avancement = avancement;
        this.tachesProject = tachesProject;
    }
}