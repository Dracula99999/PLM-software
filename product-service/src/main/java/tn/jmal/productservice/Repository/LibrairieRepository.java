package tn.jmal.productservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.productservice.Entity.Librairie;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.List;

public interface LibrairieRepository extends JpaRepository<Librairie, Long> {
    List<Librairie> findByMatierePremiere(MatierePremiere matierePremiere);
}
