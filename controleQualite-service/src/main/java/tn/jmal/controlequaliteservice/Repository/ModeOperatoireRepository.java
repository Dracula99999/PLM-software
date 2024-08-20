package tn.jmal.controlequaliteservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.controlequaliteservice.Entity.ModeOperatoire;

public interface ModeOperatoireRepository extends JpaRepository<ModeOperatoire, Long> {
    ModeOperatoire findByMatierePremiereId(Long matierePremiereId);
}
