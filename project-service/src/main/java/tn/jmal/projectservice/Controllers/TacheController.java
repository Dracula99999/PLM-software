package tn.jmal.projectservice.Controllers;

import tn.jmal.projectservice.Entities.Tache;
import tn.jmal.projectservice.Services.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class TacheController {
    @Autowired
    private TacheService tacheService;

    @GetMapping("/taches")
    public List<Tache> getAllTaches() {
        return tacheService.getAllTaches();
    }

    @GetMapping("/taches/{id}")
    public ResponseEntity<Tache> getTacheById(@PathVariable Long id) {
        Optional<Tache> tache = tacheService.getTacheById(id);
        return tache.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/CreateTaches")
    public ResponseEntity<Tache> createTache(@RequestBody Tache tache) {
        Tache createdTache = tacheService.createTache(tache);
        return ResponseEntity.ok(createdTache);
    }

    @PutMapping("/UpdateTaches/{id}")
    public ResponseEntity<Tache> updateTache(@PathVariable Long id, @RequestBody Tache tacheDetails) {
        Tache updatedTache = tacheService.updateTache(id, tacheDetails);
        return updatedTache != null ? ResponseEntity.ok(updatedTache) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/DeleteTaches/{id}")
    public ResponseEntity<Void> deleteTache(@PathVariable Long id) {
        tacheService.deleteTache(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/taskDescriptions")
    public ResponseEntity<List<String>> getAllTaskDescriptions() {
        List<String> taskDescriptions = tacheService.getAllTaskDescriptions();
        return ResponseEntity.ok(taskDescriptions);
    }
}
