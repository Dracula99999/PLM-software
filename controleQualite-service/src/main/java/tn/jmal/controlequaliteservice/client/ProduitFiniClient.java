package tn.jmal.controlequaliteservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.Optional;

@FeignClient(name = "product-service", url = "http://localhost:8084")


public interface ProduitFiniClient {

    @GetMapping("/products/{id}")
    Optional<MatierePremiere> getProduitFiniById(@PathVariable Long id);

}
