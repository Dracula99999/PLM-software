package tn.jmal.projectservice.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.jmal.projectservice.Entities.TacheProject;
import tn.jmal.projectservice.Repositories.TacheProjectRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TacheProjectService {
    @Autowired
    private TacheProjectRepository tacheProjectRepository;

    public List<TacheProject> getAllTachesProject() {
        return tacheProjectRepository.findAll();
    }

    public Optional<TacheProject> getTacheProjectById(Long id) {
        return tacheProjectRepository.findById(id);
    }

    public TacheProject createTacheProject(TacheProject tacheProject) {
        return tacheProjectRepository.save(tacheProject);
    }


    public TacheProject updateTacheProject(Long id, TacheProject tacheProjectDetails) {
        Optional<TacheProject> optionalTacheProject = tacheProjectRepository.findById(id);
        if (optionalTacheProject.isPresent()) {
            TacheProject existingTacheProject = optionalTacheProject.get();
            updateTacheProjectDetails(existingTacheProject, tacheProjectDetails);
            return tacheProjectRepository.save(existingTacheProject);
        } else {
            return null;
        }
    }
    private void updateTacheProjectDetails(TacheProject existingTacheProject, TacheProject newTacheProject) {
        existingTacheProject.setCategorie(newTacheProject.getCategorie());
        existingTacheProject.setApplicable(newTacheProject.isApplicable());
        existingTacheProject.setNonapplicable(newTacheProject.isNonapplicable());
        existingTacheProject.setAttribue(newTacheProject.getAttribue());
        existingTacheProject.setProgression(newTacheProject.getProgression());
        existingTacheProject.setJour(newTacheProject.getJour());
        existingTacheProject.setDebut(newTacheProject.getDebut());
        existingTacheProject.setProjet(newTacheProject.getProjet());
        existingTacheProject.setTache(newTacheProject.getTache());

    }

    public void deleteTacheProject(Long id) {
        tacheProjectRepository.deleteById(id);
    }

}