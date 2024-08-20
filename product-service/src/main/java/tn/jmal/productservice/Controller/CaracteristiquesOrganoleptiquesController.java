package tn.jmal.productservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.productservice.Entity.CaracteristiquesOrganoleptiques;
import tn.jmal.productservice.Service.CaracteristiquesOrganoleptiquesService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/caracteristiques-organoleptiques")
public class CaracteristiquesOrganoleptiquesController {

    @Autowired
    private CaracteristiquesOrganoleptiquesService physicoChimiquesService;

    @GetMapping
    public List<CaracteristiquesOrganoleptiques> getAllCaracteristiquesOrganoleptiques() {
        return physicoChimiquesService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaracteristiquesOrganoleptiques> getCaracteristiquesOrganoleptiquesById(@PathVariable Long id) {
        Optional<CaracteristiquesOrganoleptiques> physicoChimiques = physicoChimiquesService.findById(id);
        return physicoChimiques.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CaracteristiquesOrganoleptiques createCaracteristiquesOrganoleptiques(@RequestBody CaracteristiquesOrganoleptiques physicoChimiques) {
        return physicoChimiquesService.save(physicoChimiques);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CaracteristiquesOrganoleptiques> updateCaracteristiquesOrganoleptiques(@PathVariable Long id, @RequestBody CaracteristiquesOrganoleptiques physicoChimiquesDetails) {
        Optional<CaracteristiquesOrganoleptiques> updatedPhysicoChimiques = physicoChimiquesService.updateCaracteristiquesOrganoleptiques(id, physicoChimiquesDetails);
        return updatedPhysicoChimiques.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCaracteristiquesOrganoleptiques(@PathVariable Long id) {
        if (physicoChimiquesService.findById(id).isPresent()) {
            physicoChimiquesService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
