package tn.jmal.productservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.productservice.Entity.MatierePremiere;
import tn.jmal.productservice.Entity.Product;
import tn.jmal.productservice.Service.MatierePremiereService;
import tn.jmal.productservice.Service.ProductService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/matierePremieres")
//@CrossOrigin(origins = "http://localhost:3000")
public class MatierePemiereController {

    @Autowired
    private MatierePremiereService matierePremiereService;

    @GetMapping
    public List<MatierePremiere> getAllmatierePremieres() {
        return matierePremiereService.getAllMatierePremieres();
    }

    @GetMapping("/{id}")
    public Optional<MatierePremiere> getMatierePremiereById(@PathVariable Long id) {
        return matierePremiereService.getMatierePremiereById(id);
    }

    @GetMapping("/code/{code}")
    public Optional<MatierePremiere> getMatierePremiereByCode(@PathVariable String code) {
        return matierePremiereService.getMatierePremiereByCode(code);
    }

    @PostMapping("/creatematierePremiere")
    public MatierePremiere createMatierePremiere(@RequestBody MatierePremiere matierePremiere) {
        return matierePremiereService.saveMatierePremiere(matierePremiere);
    }

    @DeleteMapping("/{id}")
    public void deleteMatierePremiere(@PathVariable Long id) {
        matierePremiereService.deleteMatierePremiere(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MatierePremiere> updatematierePremiere(@PathVariable Long id, @RequestBody MatierePremiere matierePremiere) {
        MatierePremiere updatedmatierePremiere = matierePremiereService.updateMatierePremiere(id, matierePremiere);
        if (updatedmatierePremiere != null) {
            return ResponseEntity.ok(updatedmatierePremiere);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

