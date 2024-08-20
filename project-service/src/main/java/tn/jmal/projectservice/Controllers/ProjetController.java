package tn.jmal.projectservice.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.projectservice.Entities.Projet;
import tn.jmal.projectservice.Services.ProjetService;

import java.util.List;
import java.util.Optional;

@RestController
public class ProjetController {
    @Autowired
    private ProjetService projetService;

    @GetMapping("/projets")
    public List<Projet> getAllProjets() {
        return projetService.getAllProjets();
    }

    @GetMapping("/projets/{id}")
    public ResponseEntity<Projet> getProjetById(@PathVariable Long id) {
        Optional<Projet> projet = projetService.getProjetById(id);
        return projet.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/CreateProjets")
    public ResponseEntity<Projet> createProjet(@RequestBody Projet projet) {
        Projet createdProjet = projetService.createProjet(projet);
        return ResponseEntity.ok(createdProjet);
    }

    @PutMapping("/UpdateProjets/{id}")
    public ResponseEntity<Projet> updateProjet(@PathVariable Long id, @RequestBody Projet projetDetails) {
        Projet updatedProjet = projetService.updateProjet(id, projetDetails);
        return updatedProjet != null ? ResponseEntity.ok(updatedProjet) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/DeleteProjets/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
        projetService.deleteProjet(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/count/categorie")
    public long getCountByCategorie(@RequestParam String categorie) {
        return projetService.getNombreProjetsParCategorie(categorie);
    }
}

