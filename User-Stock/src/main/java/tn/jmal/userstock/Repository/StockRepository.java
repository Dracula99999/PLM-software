package tn.jmal.userstock.Repository;

import tn.jmal.userstock.Entities.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, Long> {
}
