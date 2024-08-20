package tn.jmal.productservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.Optional;

public interface MatierePremiereRepository extends JpaRepository<MatierePremiere, Long> {
    Optional<MatierePremiere> findByCode(String code);
}
