package tn.jmal.productservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.productservice.Entity.CategorieParent;
import tn.jmal.productservice.Service.CategorieParentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories-parents")
public class CategorieParentController {

    @Autowired
    private CategorieParentService categorieParentService;

    @GetMapping
    public List<CategorieParent> getAllCategoriesParents() {
        return categorieParentService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategorieParent> getCategorieParentById(@PathVariable Long id) {
        Optional<CategorieParent> categorieParent = categorieParentService.findById(id);
        if (categorieParent.isPresent()) {
            return ResponseEntity.ok(categorieParent.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public CategorieParent createCategorieParent(@RequestBody CategorieParent categorieParent) {
        return categorieParentService.save(categorieParent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategorieParent> updateCategorieParent(@PathVariable Long id, @RequestBody CategorieParent categorieParentDetails) {
        Optional<CategorieParent> updatedCategorieParent = categorieParentService.updateCategorieParent(id, categorieParentDetails);
        if (updatedCategorieParent.isPresent()) {
            return ResponseEntity.ok(updatedCategorieParent.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorieParent(@PathVariable Long id) {
        Optional<CategorieParent> categorieParent = categorieParentService.findById(id);
        if (categorieParent.isPresent()) {
            categorieParentService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
