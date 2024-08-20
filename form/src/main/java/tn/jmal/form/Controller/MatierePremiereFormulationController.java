package tn.jmal.form.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.form.Entity.MatierePremiereFormulation;
import tn.jmal.form.Service.MatierePremiereFormulationService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/matierePremiereFormulations")
public class MatierePremiereFormulationController {

    @Autowired
    private MatierePremiereFormulationService matierePremiereFormulationService;

    @GetMapping
    public ResponseEntity<List<MatierePremiereFormulation>> getAllMatierePremiereFormulations() {
        List<MatierePremiereFormulation> matieresPremieresFormulations = matierePremiereFormulationService.getAllMatierepremierFormulation();
        return ResponseEntity.ok(matieresPremieresFormulations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatierePremiereFormulation> getMatierePremiereFormulationById(@PathVariable Long id) {
        Optional<MatierePremiereFormulation> matierePremiereFormulation = matierePremiereFormulationService.getMatierePremiereFormulationById(id);
        return matierePremiereFormulation.map(ResponseEntity::ok)
                                         .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<MatierePremiereFormulation> createMatierePremiereFormulation(@RequestBody MatierePremiereFormulation matierePremiereFormulation) {
        MatierePremiereFormulation savedMatierePremiereFormulation = matierePremiereFormulationService.saveMatierePremiereFormulation(matierePremiereFormulation);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMatierePremiereFormulation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MatierePremiereFormulation> updateMatierePremiereFormulation(@PathVariable Long id, @RequestBody MatierePremiereFormulation matierePremiereFormulation) {
        Optional<MatierePremiereFormulation> existingMatierePremiereFormulation = matierePremiereFormulationService.getMatierePremiereFormulationById(id);
        if (existingMatierePremiereFormulation.isPresent()) {
            matierePremiereFormulation.setId(id);
            MatierePremiereFormulation updatedMatierePremiereFormulation = matierePremiereFormulationService.saveMatierePremiereFormulation(matierePremiereFormulation);
            return ResponseEntity.ok(updatedMatierePremiereFormulation);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatierePremiereFormulation(@PathVariable Long id) {
        if (matierePremiereFormulationService.getMatierePremiereFormulationById(id).isPresent()) {
            matierePremiereFormulationService.deleteMatierePremiereFormulation(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
