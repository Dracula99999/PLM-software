package tn.jmal.productservice.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomProduit;
    private String contenance;
    private int nombreVariants;

    @ManyToOne
    @JoinColumn(name = "categorie_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Categorie categorie;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private CaracteristiquesPhysicoChimiques caracteristiquesPhysicoChimiques;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private CaracteristiquesOrganoleptiques caracteristiquesOrganoleptiques;


}
