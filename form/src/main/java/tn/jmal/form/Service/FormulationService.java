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
public class FormulationService {

    @Autowired
    private FormulationRepository formulationRepository;

    @Autowired
    private MatierePremiereFormulationRepository matierePremiereFormulationRepository;

    @Autowired
    private MatierePremiereClient matierePremiereClient;

    @Autowired
    private MatierePremiereFormulationService matierePremiereFormulationService;

    public List<Formulation> getAllFormulations() {
        return formulationRepository.findAll();
    }

    public Optional<Formulation> getFormulationById(Long id) {
        return formulationRepository.findById(id);
    }


    public Formulation saveFormulation(Formulation formulation) {
        // Save the formulation first to generate an ID
        Formulation savedFormulation = formulationRepository.save(formulation);

        // Link each MatierePremiereFormulation to the saved formulation
        if (formulation.getMatieresPremieres() != null) {
            formulation.getMatieresPremieres().forEach(mpf -> {
                mpf.setFormulation(savedFormulation);
                matierePremiereFormulationService.saveMatierePremiereFormulation(mpf);
            });
        }

        return savedFormulation;
    }





    public void deleteFormulation(Long id) {
        formulationRepository.deleteById(id);
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
