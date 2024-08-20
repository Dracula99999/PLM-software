package tn.jmal.productservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.productservice.Entity.Categorie;
import tn.jmal.productservice.Service.CategorieService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CategorieController {

    @Autowired
    private CategorieService categorieService;

    @GetMapping
    public List<Categorie> getAllCategories() {
        return categorieService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categorie> getCategorieById(@PathVariable Long id) {
        Optional<Categorie> categorie = categorieService.findById(id);
        if (categorie.isPresent()) {
            return ResponseEntity.ok(categorie.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieService.save(categorie);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Categorie> updateCategorie(@PathVariable Long id, @RequestBody Categorie categorieDetails) {
        Optional<Categorie> updatedCategorie = categorieService.updateCategorie(id, categorieDetails);
        if (updatedCategorie.isPresent()) {
            return ResponseEntity.ok(updatedCategorie.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        Optional<Categorie> categorie = categorieService.findById(id);
        if (categorie.isPresent()) {
            categorieService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
