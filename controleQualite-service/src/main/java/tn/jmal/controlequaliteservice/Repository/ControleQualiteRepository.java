package tn.jmal.controlequaliteservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.controlequaliteservice.Entity.ControleQualite;

import java.util.List;

public interface ControleQualiteRepository extends JpaRepository<ControleQualite, Long> {
    ControleQualite findByMatierePremiereId(Long matierePremiereId);
}
