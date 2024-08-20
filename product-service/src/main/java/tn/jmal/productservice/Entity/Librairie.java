package tn.jmal.productservice.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Librairie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String langue;
    private LocalDate dateDuDocument;
    private LocalDate dateExpiration;
    private LocalDate demandeLe;
    private String modifiePar;
    private LocalDate misAJourLe;

    @Lob
    @Column(length = 16777215)
    private byte[] fichier;

    @ManyToOne
    @JoinColumn(name = "matiere_premiere_id")
    private MatierePremiere matierePremiere;
}
