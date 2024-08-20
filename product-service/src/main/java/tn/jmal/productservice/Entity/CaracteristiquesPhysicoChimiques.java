package tn.jmal.productservice.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CaracteristiquesPhysicoChimiques {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double pHMin;
    private double pHValidation;
    private double pHMax;
    private String vMin;
    private String vValidation;
    private String vMax;
    private double densite20C;
    private String aspect;
    private double dchl;
    private double alcaliLibreNaOH;
    private double detartrant;

    //@OneToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "product_id", referencedColumnName = "id")
    //private Product product;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonBackReference
    private Product product;

}
