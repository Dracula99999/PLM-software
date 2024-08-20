package tn.jmal.productservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.productservice.Entity.Categorie;

public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}
