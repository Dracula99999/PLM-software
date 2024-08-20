package tn.jmal.form.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.form.Entity.Formulation;
import tn.jmal.form.Entity.MatierePremiereFormulation;
import tn.jmal.form.Repository.FormulationRepository;
import tn.jmal.form.Repository.MatierePremiereFormulationRepository;
import tn.jmal.form.client.MatierePremiereClient;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.List;
import java.util.Optional;

@Service
public class MatierePremiereFormulationService {

    @Autowired
    private MatierePremiereFormulationRepository matierePremiereFormulationRepository;



    @Autowired
    private MatierePremiereClient matierePremiereClient;

    public List<MatierePremiereFormulation> getAllMatierepremierFormulation() {
        return matierePremiereFormulationRepository.findAll();
    }

    public Optional<MatierePremiereFormulation> getMatierePremiereFormulationById(Long id) {
        return matierePremiereFormulationRepository.findById(id);
    }


    public MatierePremiereFormulation saveMatierePremiereFormulation(MatierePremiereFormulation matierePremiereFormulation) {
        return matierePremiereFormulationRepository.save(matierePremiereFormulation);
    }

    public void deleteMatierePremiereFormulation(Long id) {
        matierePremiereFormulationRepository.deleteById(id);
    }

    public Optional<MatierePremiereFormulation> getMatierePremiereFormulationByCodeMP(String codeMP) {
        Optional<MatierePremiere> matierePremiere = matierePremiereClient.getMatierePremiereByCode(codeMP);
        if (matierePremiere.isPresent()) {
            MatierePremiereFormulation mpf = new MatierePremiereFormulation();
            mpf.setCodeMP(codeMP);
            return Optional.of(mpf);
        }
        return Optional.empty();
    }
}
