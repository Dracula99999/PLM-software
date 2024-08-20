package tn.jmal.projectservice.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.jmal.projectservice.Entities.Projet;
import tn.jmal.projectservice.Entities.Tache;
import tn.jmal.projectservice.Entities.TacheProject;
import tn.jmal.projectservice.Repositories.ProjetRepository;
import tn.jmal.projectservice.Repositories.TacheProjectRepository;
import tn.jmal.projectservice.Repositories.TacheRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProjetService {
    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private TacheRepository tacheRepository;

    @Autowired
    private TacheProjectRepository tacheProjectRepository;

    public List<Projet> getAllProjets() {
        return projetRepository.findAll();
    }

    public Optional<Projet> getProjetById(Long id) {
        return projetRepository.findById(id);
    }

    @Transactional
    public Projet createProjet(Projet projet) {
        // Créer le projet
        Projet createdProjet = projetRepository.save(projet);

        // Tâches prédéfinies
        List<Tache> predefinedTasks = Arrays.asList(
                new Tache(null, "Fiche de déclanchement du nouveau produit", null),
                new Tache(null, "Planification du projet du nouveau produit", null),
                new Tache(null, "Elaboration de la fiche des exigences spécifiques des nouveaux produits", null),
                new Tache(null, "Echantillons de l’emballage plastique", null),
                new Tache(null, "Choix de l’emballage plastique", null)
        );

        // Sauvegarder les tâches dans la base de données
        for (Tache task : predefinedTasks) {
            Tache createdTask = tacheRepository.save(task);

            // Associer les tâches au projet
            TacheProject tacheProject = new TacheProject();
            tacheProject.setProjet(createdProjet);
            tacheProject.setTache(createdTask);
            tacheProject.setApplicable(true); // par défaut, définissez les tâches comme applicables
            tacheProjectRepository.save(tacheProject);
        }

        return createdProjet;
    }

    public Projet updateProjet(Long id, Projet projetDetails) {
        Optional<Projet> optionalProjet = projetRepository.findById(id);
        if (optionalProjet.isPresent()) {
            Projet existingProjet = optionalProjet.get();
            updateProjetDetails(existingProjet, projetDetails);
            return projetRepository.save(existingProjet);
        } else {
            return null;
        }
    }

    private void updateProjetDetails(Projet existingProjet, Projet newProjet) {
        existingProjet.setTitre(newProjet.getTitre());
        existingProjet.setCategorie(newProjet.getCategorie());
        existingProjet.setDateDebut(newProjet.getDateDebut());
        existingProjet.setAvancement(newProjet.getAvancement());
        existingProjet.setTachesProject(newProjet.getTachesProject());
        existingProjet.setDureeDuProjet(newProjet.getDureeDuProjet());
        existingProjet.setDebutReel(newProjet.getDebutReel());
        existingProjet.setDureeReel(newProjet.getDureeReel());
    }

    public void deleteProjet(Long id) {
        projetRepository.deleteById(id);
    }
    @Autowired
    private ProjetRepository projetRepository1;

    public long getNombreProjetsParCategorie(String categorie) {
        return projetRepository1.countByCategorie(categorie);
    }
}

