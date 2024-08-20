package tn.jmal.productservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.jmal.productservice.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
