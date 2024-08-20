package tn.jmal.productservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.productservice.Entity.CaracteristiquesPhysicoChimiques;
import tn.jmal.productservice.Service.CaracteristiquesPhysicoChimiquesService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/caracteristiques")
public class CaracteristiquesPhysicoChimiquesController {

    @Autowired
    private CaracteristiquesPhysicoChimiquesService physicoChimiquesService;

    @GetMapping
    public List<CaracteristiquesPhysicoChimiques> getAllCaracteristiquesPhysicoChimiques() {
        return physicoChimiquesService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CaracteristiquesPhysicoChimiques> getCaracteristiquesPhysicoChimiquesById(@PathVariable Long id) {
        Optional<CaracteristiquesPhysicoChimiques> physicoChimiques = physicoChimiquesService.findById(id);
        return physicoChimiques.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public CaracteristiquesPhysicoChimiques createCaracteristiquesPhysicoChimiques(@RequestBody CaracteristiquesPhysicoChimiques physicoChimiques) {
        return physicoChimiquesService.save(physicoChimiques);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CaracteristiquesPhysicoChimiques> updateCaracteristiquesPhysicoChimiques(@PathVariable Long id, @RequestBody CaracteristiquesPhysicoChimiques physicoChimiquesDetails) {
        Optional<CaracteristiquesPhysicoChimiques> updatedPhysicoChimiques = physicoChimiquesService.updateCaracteristiquesPhysicoChimiques(id, physicoChimiquesDetails);
        return updatedPhysicoChimiques.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCaracteristiquesPhysicoChimiques(@PathVariable Long id) {
        if (physicoChimiquesService.findById(id).isPresent()) {
            physicoChimiquesService.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
