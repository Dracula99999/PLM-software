package tn.jmal.projectservice.Repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.jmal.projectservice.Entities.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetRepository extends JpaRepository<Projet, Long> {
    @Query("SELECT COUNT(p) FROM Projet p WHERE p.categorie = :categorie")
    long countByCategorie(@Param("categorie") String categorie);
}
