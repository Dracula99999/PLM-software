package tn.jmal.controlequaliteservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.controlequaliteservice.Entity.ControleQualite;
import tn.jmal.controlequaliteservice.Entity.ControleQualiteEnCoursDeMelange;
import tn.jmal.controlequaliteservice.Service.ControleQualiteEnCoursDeMelangeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/controleQualiteEnCoursDeMelange")
public class ControleQualiteEnCoursDeMelangeController {

    @Autowired
    private ControleQualiteEnCoursDeMelangeService service;

    @GetMapping
    public List<ControleQualiteEnCoursDeMelange> getAllControleQualite() {
        return service.getAllControleQualite();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ControleQualiteEnCoursDeMelange> getControleQualiteById(@PathVariable Long id) {
        Optional<ControleQualiteEnCoursDeMelange> controleQualite = service.getControleQualiteById(id);
        return controleQualite.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ControleQualiteEnCoursDeMelange createControleQualite(@RequestBody ControleQualiteEnCoursDeMelange controleQualite) {
        return service.createControleQualite(controleQualite);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ControleQualiteEnCoursDeMelange> updateControleQualite(@PathVariable Long id, @RequestBody ControleQualiteEnCoursDeMelange updatedControleQualite) {
        try {
            ControleQualiteEnCoursDeMelange controleQualite = service.updateControleQualite(id, updatedControleQualite);
            return ResponseEntity.ok(controleQualite);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteControleQualite(@PathVariable Long id) {
        service.deleteControleQualite(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/matierePremiere/{matierePremiereId}")
    public ResponseEntity<List<ControleQualiteEnCoursDeMelange>> getControleQualiteByMatierePremiere(@PathVariable Long matierePremiereId) {
        List<ControleQualiteEnCoursDeMelange> controleQualites = service.getControleQualiteByMatierePremiere(matierePremiereId);
        if (controleQualites.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(controleQualites);
    }

}
