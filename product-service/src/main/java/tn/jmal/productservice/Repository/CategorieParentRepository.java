package tn.jmal.productservice.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.productservice.Entity.CategorieParent;

public interface CategorieParentRepository extends JpaRepository<CategorieParent, Long> {
}

