package tn.jmal.controlequaliteservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.jmal.controlequaliteservice.Entity.ControleQualite;
import tn.jmal.controlequaliteservice.Service.ControleQualiteService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/controleQualites")
public class ControleQualiteController {

    @Autowired
    private ControleQualiteService controleQualiteService;

    @GetMapping
    public List<ControleQualite> getAllControleQualites() {
        return controleQualiteService.getAllControleQualites();
    }

    @GetMapping("/{id}")
    public Optional<ControleQualite> getControleQualiteById(@PathVariable Long id) {
        return controleQualiteService.getControleQualiteById(id);
    }

    @PostMapping("/create")
    public ControleQualite createControleQualite(@RequestBody ControleQualite controleQualite) {
        return controleQualiteService.saveControleQualite(controleQualite);
    }

    @PutMapping("/{id}")
    public ControleQualite updateControleQualite(@PathVariable Long id, @RequestBody ControleQualite controleQualite) {
        return controleQualiteService.updateControleQualite(id, controleQualite);
    }

    @DeleteMapping("/{id}")
    public void deleteControleQualite(@PathVariable Long id) {
        controleQualiteService.deleteControleQualite(id);
    }

    @GetMapping("/matierePremiere/{matierePremiereId}")
    public ResponseEntity<ControleQualite> getControleQualiteByMatierePremiere(@PathVariable Long matierePremiereId) {
        ControleQualite controleQualite = controleQualiteService.getControleQualiteByMatierePremiere(matierePremiereId);
        if (controleQualite == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(controleQualite);
    }

}
