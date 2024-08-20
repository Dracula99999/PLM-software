package tn.jmal.controlequaliteservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.controlequaliteservice.Entity.ModeOperatoire;
import tn.jmal.controlequaliteservice.Repository.ModeOperatoireRepository;
import tn.jmal.controlequaliteservice.client.MatierePremiereClient;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.List;
import java.util.Optional;

@Service
public class ModeOperatoireService {

    @Autowired
    private ModeOperatoireRepository modeOperatoireRepository;
    @Autowired
    private MatierePremiereClient matierePremiereClient;

    public ModeOperatoire saveModeOperatoire(ModeOperatoire modeOperatoire) {
        Optional<MatierePremiere> matierePremiereOptional = matierePremiereClient.getMatierePremiereById(modeOperatoire.getMatierePremiereId());

        if (matierePremiereOptional.isPresent()) {
            return modeOperatoireRepository.save(modeOperatoire);
        } else {
            throw new RuntimeException("MatierePremiere non trouvée avec l'ID : " + modeOperatoire.getMatierePremiereId());
        }

    }

    public ModeOperatoire getModeOperatoireById(Long id) {
        return modeOperatoireRepository.findById(id).orElse(null);
    }

    public List<ModeOperatoire> getAllModeOperatoires() {
        return modeOperatoireRepository.findAll();
    }

    public ModeOperatoire getModeOperatoireByMatierePremiereId(Long matierePremiereId) {
        return modeOperatoireRepository.findByMatierePremiereId(matierePremiereId);
    }

    public Optional<MatierePremiere> getMatierePremiereDetails(Long matierePremiereId) {
        return matierePremiereClient.getMatierePremiereById(matierePremiereId);
    }

    public void deleteModeOperatoire(Long id) {
        modeOperatoireRepository.deleteById(id);
    }
}
