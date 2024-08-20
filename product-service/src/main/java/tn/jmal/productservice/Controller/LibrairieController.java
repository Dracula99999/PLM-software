package tn.jmal.productservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.jmal.productservice.Entity.Librairie;
import tn.jmal.productservice.Service.LibrairieService;

import java.util.List;

@RestController
@RequestMapping("/api/librairie")
public class LibrairieController {
    @Autowired
    private LibrairieService librairieService;

    @GetMapping
    public List<Librairie> getAllLibrairie() {
        return librairieService.getAllLibrairie();
    }

    @GetMapping("/{id}")
    public Librairie getLibrairieById(@PathVariable Long id) {
        return librairieService.getLibrairieById(id);
    }

    @GetMapping("/matiere/{matierePremiereId}")
    public List<Librairie> getLibrairiesByMatierePremiere(@PathVariable Long matierePremiereId) {
        return librairieService.getLibrairieByMatierePremiere(matierePremiereId);
    }

    @PostMapping
    public Librairie createLibrairie(@RequestBody Librairie librairie) {
        return librairieService.saveLibrairie(librairie);
    }

    @PostMapping("/upload")
    public Librairie uploadFile(@RequestBody Librairie librairie) {
        return librairieService.saveLibrairie(librairie);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long id) {
        Librairie librairie = librairieService.getLibrairieById(id);
        if (librairie != null && librairie.getFichier() != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + librairie.getType() + ".pdf\"")
                    .body(librairie.getFichier());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public Librairie updateLibrairie(@PathVariable Long id, @RequestBody Librairie updatedLibrairie) {

        updatedLibrairie.setId(id);
        return librairieService.saveLibrairie(updatedLibrairie);
    }


    @DeleteMapping("/{id}")
    public void deleteLibrairie(@PathVariable Long id) {
        librairieService.deleteLibrairie(id);
    }
}
