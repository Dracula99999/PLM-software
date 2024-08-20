package tn.jmal.controlequaliteservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.controlequaliteservice.Entity.ControleQualite;
import tn.jmal.controlequaliteservice.Entity.ControleQualiteEnCoursDeMelange;
import tn.jmal.controlequaliteservice.Repository.ControleQualiteEnCoursDeMelangeRepository;
import tn.jmal.controlequaliteservice.client.MatierePremiereClient;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.List;
import java.util.Optional;

@Service
public class ControleQualiteEnCoursDeMelangeService {

    @Autowired
    private ControleQualiteEnCoursDeMelangeRepository repository;
    @Autowired
    private MatierePremiereClient matierePremiereClient;

    public List<ControleQualiteEnCoursDeMelange> getAllControleQualite() {
        return repository.findAll();
    }

    public Optional<ControleQualiteEnCoursDeMelange> getControleQualiteById(Long id) {
        return repository.findById(id);
    }

    public ControleQualiteEnCoursDeMelange createControleQualite(ControleQualiteEnCoursDeMelange controleQualite) {

        Optional<MatierePremiere> matierePremiereOptional = matierePremiereClient.getMatierePremiereById(controleQualite.getMatierePremiereId());

        if (matierePremiereOptional.isPresent()) {
            return repository.save(controleQualite);
        } else {
            throw new RuntimeException("MatierePremiere non trouvée avec l'ID : " + controleQualite.getMatierePremiereId());
        }
    }

    public ControleQualiteEnCoursDeMelange updateControleQualite(Long id, ControleQualiteEnCoursDeMelange updatedControleQualite) {
        // Fetch the existing ControleQualiteEnCoursDeMelange
        return repository.findById(id)
                .map(existingControleQualite -> {
                    // Verify the existence of MatierePremiere
                    Optional<MatierePremiere> matierePremiereOptional = matierePremiereClient.getMatierePremiereById(updatedControleQualite.getMatierePremiereId());

                    if (matierePremiereOptional.isPresent()) {
                        // Update fields only if MatierePremiere exists
                        existingControleQualite.setMatierePremiereId(updatedControleQualite.getMatierePremiereId());
                        existingControleQualite.setDesignation(updatedControleQualite.getDesignation());
                        existingControleQualite.setDateDebutControl(updatedControleQualite.getDateDebutControl());
                        existingControleQualite.setMalaxeur(updatedControleQualite.getMalaxeur());
                        existingControleQualite.setNumeroLot(updatedControleQualite.getNumeroLot());
                        existingControleQualite.setTemperatureValidation(updatedControleQualite.getTemperatureValidation());
                        existingControleQualite.setParametreMesure(updatedControleQualite.getParametreMesure());
                        existingControleQualite.setAcceptance(updatedControleQualite.getAcceptance());
                        existingControleQualite.setVisaTechCQ(updatedControleQualite.getVisaTechCQ());
                        existingControleQualite.setVisaRespCQ(updatedControleQualite.getVisaRespCQ());
                        existingControleQualite.setDateCloture(updatedControleQualite.getDateCloture());

                        // Save the updated ControleQualiteEnCoursDeMelange
                        return repository.save(existingControleQualite);
                    } else {
                        // Throw an exception if MatierePremiere does not exist
                        throw new RuntimeException("MatierePremiere non trouvée avec l'ID : " + updatedControleQualite.getMatierePremiereId());
                    }
                })
                .orElseThrow(() -> new RuntimeException("ControleQualiteEnCoursDeMelange not found with id " + id));
    }


    public void deleteControleQualite(Long id) {
        repository.deleteById(id);
    }

    public List<ControleQualiteEnCoursDeMelange> getControleQualiteByMatierePremiere(Long matierePremiereId) {
        return repository.findByMatierePremiereId(matierePremiereId);
    }
}
