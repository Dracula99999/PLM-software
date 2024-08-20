package tn.jmal.projectservice.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.jmal.projectservice.Entities.Tache;
import tn.jmal.projectservice.Repositories.TacheRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TacheService {
    @Autowired
    private TacheRepository tacheRepository;

    public List<Tache> getAllTaches() {
        return tacheRepository.findAll();
    }

    public Optional<Tache> getTacheById(Long id) {
        return tacheRepository.findById(id);
    }

    public Tache createTache(Tache tache) {
        return tacheRepository.save(tache);
    }

    public Tache updateTaches(Tache tache) {
        return tacheRepository.save(tache);
    }
    public Tache updateTache(Long id, Tache tacheDetails) {
        Optional<Tache> optionalTache = tacheRepository.findById(id);
        if (optionalTache.isPresent()) {
            Tache existingTache = optionalTache.get();
            updateTacheDetails(existingTache, tacheDetails);
            return tacheRepository.save(existingTache);
        } else {
            return null;
        }
    }
    private void updateTacheDetails(Tache existingTache, Tache newTache) {
        existingTache.setDescription(newTache.getDescription());
        existingTache.setService(newTache.getService());
        // existingTache.setTacheProject(newTache.getTacheProject());

    }

    public void deleteTache(Long id) {
        tacheRepository.deleteById(id);
    }
    public List<String> getAllTaskDescriptions() {
        List<Tache> taches = tacheRepository.findAll();
        return taches.stream()
                .map(Tache::getDescription)
                .collect(Collectors.toList());
    }

}