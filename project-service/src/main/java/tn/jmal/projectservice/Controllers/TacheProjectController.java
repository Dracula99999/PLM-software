package tn.jmal.projectservice.Controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.projectservice.Entities.Service;
import tn.jmal.projectservice.Entities.Tache;
import tn.jmal.projectservice.Entities.TacheProject;
import tn.jmal.projectservice.Services.ServiceService;
import tn.jmal.projectservice.Services.TacheProjectService;
import tn.jmal.projectservice.Services.TacheService;

import java.util.List;
import java.util.Optional;

@RestController
public class TacheProjectController {

    @Autowired
    private TacheProjectService tacheProjectService;
    @Autowired
    private TacheService tacheService;

    @Autowired
    private ServiceService serviceService;

    @GetMapping("/tachesProject")
    public List<TacheProject> getAllTachesProject() {
        return tacheProjectService.getAllTachesProject();
    }

    @GetMapping("/tachesProject/{id}")
    public ResponseEntity<TacheProject> getTacheProjectById(@PathVariable Long id) {
        Optional<TacheProject> tacheProject = tacheProjectService.getTacheProjectById(id);
        return tacheProject.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/CreateTachesProject")
    public ResponseEntity<TacheProject> createTacheProject(@RequestBody TacheProject tacheProject) {
        TacheProject createdTacheProject = tacheProjectService.createTacheProject(tacheProject);
        return ResponseEntity.ok(createdTacheProject);
    }

    @PutMapping("/UpdateTachesProject/{id}")
    public ResponseEntity<TacheProject> updateTacheProject(@PathVariable Long id, @RequestBody TacheProject updatedTacheProject) {
        Optional<TacheProject> existingTacheProject = tacheProjectService.getTacheProjectById(id);
        if (existingTacheProject.isPresent()) {
            TacheProject tacheProject = existingTacheProject.get();

            // Mettre à jour les champs modifiés
            // Mettre à jour les champs de TacheProject
            if (updatedTacheProject.getCategorie() != null) {
                tacheProject.setCategorie(updatedTacheProject.getCategorie());
            }
            if (updatedTacheProject.getAttribue() != null) {
                tacheProject.setAttribue(updatedTacheProject.getAttribue());
            }
            if (updatedTacheProject.getProgression() != 0) {
                tacheProject.setProgression(updatedTacheProject.getProgression());
            }
            if (updatedTacheProject.getJour() != null) {
                tacheProject.setJour(updatedTacheProject.getJour());
            }
            if (updatedTacheProject.getDebut() != null) {
                tacheProject.setDebut(updatedTacheProject.getDebut());
            }
            if (updatedTacheProject.isApplicable() != tacheProject.isApplicable()) {
                tacheProject.setApplicable(updatedTacheProject.isApplicable());
            }
            if (updatedTacheProject.isNonapplicable() != tacheProject.isNonapplicable()) {
                tacheProject.setNonapplicable(updatedTacheProject.isNonapplicable());
            }

            // Mettre à jour l'attribut Tache si nécessaire
            if (updatedTacheProject.getTache() != null) {
                Tache existingTache = tacheService.getTacheById(updatedTacheProject.getTache().getId()).orElse(null);
                if (existingTache != null) {
                    if (updatedTacheProject.getTache().getDescription() != null) {
                        existingTache.setDescription(updatedTacheProject.getTache().getDescription());
                    }
                    if (updatedTacheProject.getTache().getService() != null) {
                        String nomService = updatedTacheProject.getTache().getService().getNom(); // Assurez-vous que getIdService() est correct
                        Service updatedService = serviceService.getByName(nomService).orElse(null);
                        if (updatedService != null) {
                            existingTache.setService(updatedService);
                        }
                    }
                    tacheService.updateTaches(existingTache);
                    tacheProject.setTache(existingTache);
                }
            }

            // Mettre à jour le projet associé si nécessaire
            if (updatedTacheProject.getProjet() != null) {
                tacheProject.setProjet(updatedTacheProject.getProjet());
            }
            // Assurez-vous que la logique de mise à jour ne supprime pas la tâche
            TacheProject updatedTache = tacheProjectService.createTacheProject(tacheProject); // Utiliser createTacheProject pour la mise à jour
            return ResponseEntity.ok(updatedTache);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/DeleteTachesProject/{id}")
    public ResponseEntity<Void> deleteTacheProject(@PathVariable Long id) {
        tacheProjectService.deleteTacheProject(id);
        return ResponseEntity.noContent().build();
    }
}
