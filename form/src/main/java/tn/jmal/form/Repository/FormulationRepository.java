package tn.jmal.form.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.form.Entity.Formulation;
import tn.jmal.form.Entity.MatierePremiereFormulation;

public interface FormulationRepository extends JpaRepository<Formulation, Long> {

}
