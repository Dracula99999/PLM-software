package tn.jmal.userstock.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Use Long as the primary key
    private String StockCode;
    @Column(nullable = false)
    private int quantite =0;
    private Date creationDate;
    private Long matierePremiereId;
    @PrePersist
    protected void onCreate() {
        this.creationDate = new Date();
    }
}
