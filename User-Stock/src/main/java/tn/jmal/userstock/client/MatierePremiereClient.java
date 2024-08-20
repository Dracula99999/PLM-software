package tn.jmal.userstock.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.Optional;

@FeignClient(name = "product-service", url = "http://localhost:8084")


public interface MatierePremiereClient {

    @GetMapping("/matierePremieres/{id}")
    Optional<MatierePremiere> getMatierePremiereById(@PathVariable Long id);

    @GetMapping("/matierePremieres/code/{code}")
    Optional<MatierePremiere> getMatierePremiereByCode(@PathVariable String code);
}
