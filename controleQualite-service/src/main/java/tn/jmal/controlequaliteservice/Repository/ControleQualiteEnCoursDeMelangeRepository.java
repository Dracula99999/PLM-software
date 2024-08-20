package tn.jmal.controlequaliteservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.controlequaliteservice.Entity.ControleQualiteEnCoursDeMelange;

import java.util.List;

public interface ControleQualiteEnCoursDeMelangeRepository extends JpaRepository<ControleQualiteEnCoursDeMelange, Long> {
    List<ControleQualiteEnCoursDeMelange> findByMatierePremiereId(Long matierePremiereId);
}
