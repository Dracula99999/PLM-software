package tn.jmal.controlequaliteservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.jmal.controlequaliteservice.Entity.ModeOperatoire;
import tn.jmal.controlequaliteservice.Service.ModeOperatoireService;

import java.util.List;

@RestController
@RequestMapping("/api/modeOperatoires/")
public class ModeOperatoireController {

    @Autowired
    private ModeOperatoireService modeOperatoireService;

    @GetMapping
    public List<ModeOperatoire> getAllModeOperatoires() {
        return modeOperatoireService.getAllModeOperatoires();
    }

    @GetMapping("/{id}")
    public ModeOperatoire getModeOperatoireByMatierPremierId(@PathVariable Long id) {
        return modeOperatoireService.getModeOperatoireByMatierePremiereId(id);
    }

    @PostMapping("/create")
    public ModeOperatoire createControleQualite(@RequestBody ModeOperatoire modeOperatoire) {
        return modeOperatoireService.saveModeOperatoire(modeOperatoire);
    }

    @DeleteMapping("/{id}")
    public void deleteControleQualite(@PathVariable Long id) {
        modeOperatoireService.deleteModeOperatoire(id);
    }
}
