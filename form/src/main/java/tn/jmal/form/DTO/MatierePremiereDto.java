package tn.jmal.form.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatierePremiereDto {
    private Long id;
    private String article;
    private String fabricant;
    private String fournisseur;
    private String code;
    private int Nfamille;
    private String observation;
}
