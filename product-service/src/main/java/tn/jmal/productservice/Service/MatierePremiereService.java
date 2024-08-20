package tn.jmal.productservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.productservice.Entity.MatierePremiere;
import tn.jmal.productservice.Repository.CategorieRepository;
import tn.jmal.productservice.Repository.MatierePremiereRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MatierePremiereService {

    @Autowired
    private MatierePremiereRepository matierepremiereRepository;


    @Autowired
    private CategorieRepository categorieRepository;

    public List<MatierePremiere> getAllMatierePremieres() {
        return matierepremiereRepository.findAll();
    }

    public Optional<MatierePremiere> getMatierePremiereById(Long id) {
        return matierepremiereRepository.findById(id);
    }

    public Optional<MatierePremiere> getMatierePremiereByCode(String code) {
        return matierepremiereRepository.findByCode(code);
    }


    public MatierePremiere saveMatierePremiere(MatierePremiere MatierePremiere) {
        return matierepremiereRepository.save(MatierePremiere);
    }

    public void deleteMatierePremiere(Long id) {
        matierepremiereRepository.deleteById(id);
    }

    public MatierePremiere updateMatierePremiere(Long id, MatierePremiere MatierePremiereDetails) {
        Optional<MatierePremiere> MatierePremiereOptional = matierepremiereRepository.findById(id);
        if (MatierePremiereOptional.isPresent()) {
            MatierePremiere existingMatierePremiere = MatierePremiereOptional.get();
            updateMatierePremiereDetails(existingMatierePremiere, MatierePremiereDetails);
            return matierepremiereRepository.save(existingMatierePremiere);
        } else {
            return null;
        }
    }

    private void updateMatierePremiereDetails(MatierePremiere existingMatierePremiere, MatierePremiere newMatierePremiere) {
        existingMatierePremiere.setArticle(newMatierePremiere.getArticle());
        existingMatierePremiere.setFabricant(newMatierePremiere.getFabricant());
        existingMatierePremiere.setFournisseur(newMatierePremiere.getFournisseur());
        existingMatierePremiere.setObservation(newMatierePremiere.getObservation());
        existingMatierePremiere.setCategorie(newMatierePremiere.getCategorie());
        //existingMatierePremiere.setCaracteristiquesPhysicoChimiques(newMatierePremiere.getCaracteristiquesPhysicoChimiques());
        //existingMatierePremiere.setCaracteristiquesOrganoleptiques(newMatierePremiere.getCaracteristiquesOrganoleptiques());
    }
}
