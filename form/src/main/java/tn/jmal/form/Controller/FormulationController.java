package tn.jmal.form.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.form.Entity.Formulation;
import tn.jmal.form.Entity.MatierePremiereFormulation;
import tn.jmal.form.Service.FormulationService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/formulations")
public class FormulationController {

    @Autowired
    private FormulationService formulationService;

    @GetMapping
    public List<Formulation> getAllFormulations() {
        return formulationService.getAllFormulations();
    }

    @GetMapping("/{id}")
    public Optional<Formulation> getFormulationById(@PathVariable Long id) {
        return formulationService.getFormulationById(id);
    }

    @PostMapping
    public Formulation createFormulation(@RequestBody Formulation formulation) {
        return formulationService.saveFormulation(formulation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formulation> updateFormulation(@PathVariable Long id, @RequestBody Formulation formulation) {
        // Mettre à jour la Formulation et ses MatierePremiereFormulation associées
        Optional<Formulation> existingFormulation = formulationService.getFormulationById(id);
        if (existingFormulation.isPresent()) {
            formulation.setId(id);
            Formulation updatedFormulation = formulationService.saveFormulation(formulation);
            return ResponseEntity.ok(updatedFormulation);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @DeleteMapping("/{id}")
    public void deleteFormulation(@PathVariable Long id) {
        formulationService.deleteFormulation(id);
    }

    @GetMapping("/matierePremiere/{codeMP}")
    public Optional<MatierePremiereFormulation> getMatierePremiereFormulationByCodeMP(@PathVariable String codeMP) {
        return formulationService.getMatierePremiereFormulationByCodeMP(codeMP);
    }
}
