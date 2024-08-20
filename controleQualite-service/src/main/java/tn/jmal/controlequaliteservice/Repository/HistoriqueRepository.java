package tn.jmal.controlequaliteservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.controlequaliteservice.Entity.Historique;

public interface HistoriqueRepository extends JpaRepository<Historique, Long> {
}
