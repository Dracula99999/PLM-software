package tn.jmal.controlequaliteservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.controlequaliteservice.Entity.ControleQualite;
import tn.jmal.controlequaliteservice.Repository.ControleQualiteRepository;
import tn.jmal.controlequaliteservice.client.MatierePremiereClient;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.List;
import java.util.Optional;

@Service
public class ControleQualiteService {

    @Autowired
    private ControleQualiteRepository controleQualiteRepository;

    @Autowired
    private MatierePremiereClient matierePremiereClient;

    public List<ControleQualite> getAllControleQualites() {
        return controleQualiteRepository.findAll();
    }

    public Optional<ControleQualite> getControleQualiteById(Long id) {
        return controleQualiteRepository.findById(id);
    }

    public Optional<MatierePremiere> getMatierePremiereDetails(Long matierePremiereId) {
        return matierePremiereClient.getMatierePremiereById(matierePremiereId);
    }

    public ControleQualite saveControleQualite(ControleQualite controleQualite) {
        Optional<MatierePremiere> matierePremiereOptional = matierePremiereClient.getMatierePremiereById(controleQualite.getMatierePremiereId());

        if (matierePremiereOptional.isPresent()) {
            return controleQualiteRepository.save(controleQualite);
        } else {
            throw new RuntimeException("MatierePremiere non trouvée avec l'ID : " + controleQualite.getMatierePremiereId());
        }
    }

    public void deleteControleQualite(Long id) {
        controleQualiteRepository.deleteById(id);
    }

    public ControleQualite updateControleQualite(Long id, ControleQualite controleQualiteDetails) {
        Optional<ControleQualite> existingControleQualiteOptional = controleQualiteRepository.findById(id);
        if (existingControleQualiteOptional.isPresent()) {
            ControleQualite existingControleQualite = existingControleQualiteOptional.get();
            updateControleQualiteDetails(existingControleQualite, controleQualiteDetails);
            return controleQualiteRepository.save(existingControleQualite);
        } else {
            return null;
        }
    }

    private void updateControleQualiteDetails(ControleQualite existingControleQualite, ControleQualite newControleQualite) {
        existingControleQualite.setMatierePremiereId(newControleQualite.getMatierePremiereId());
        existingControleQualite.setDesignation(newControleQualite.getDesignation());
        existingControleQualite.setDateReception(newControleQualite.getDateReception());
        existingControleQualite.setTailleLot(newControleQualite.getTailleLot());
        existingControleQualite.setUnite(newControleQualite.getUnite());
        existingControleQualite.setDatePrelevement(newControleQualite.getDatePrelevement());
        existingControleQualite.setDateAnalyse(newControleQualite.getDateAnalyse());
        existingControleQualite.setOperateur(newControleQualite.getOperateur());
        existingControleQualite.setAcceptance(newControleQualite.getAcceptance());
        existingControleQualite.setDateAcceptance(newControleQualite.getDateAcceptance());
        existingControleQualite.setValidatedBy(newControleQualite.getValidatedBy());
    }
    public ControleQualite getControleQualiteByMatierePremiere(Long matierePremiereId) {
        return controleQualiteRepository.findByMatierePremiereId(matierePremiereId);
    }
}

