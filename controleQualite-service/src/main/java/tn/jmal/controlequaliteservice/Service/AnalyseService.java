package tn.jmal.controlequaliteservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.controlequaliteservice.Entity.Analyse;
import tn.jmal.controlequaliteservice.Entity.ControleQualite;
import tn.jmal.controlequaliteservice.Repository.AnalyseRepository;
import tn.jmal.controlequaliteservice.Repository.ControleQualiteRepository;

@Service
public class AnalyseService {

    @Autowired
    private AnalyseRepository analyseRepository;

    @Autowired
    private ControleQualiteRepository controleQualiteRepository;

    public Analyse saveAnalyse(Analyse analyse) {
        ControleQualite controleQualite = analyse.getControleQualite();
        if (controleQualite != null) {
            if (controleQualite.getId() == null || !controleQualiteRepository.existsById(controleQualite.getId())) {
                controleQualite = controleQualiteRepository.save(controleQualite);
            }
        }
        analyse.setControleQualite(controleQualite);
        return analyseRepository.save(analyse);
    }


    public Analyse getAnalyseById(Long id) {
        return analyseRepository.findById(id).orElse(null);
    }

    public void deleteAnalyse(Long id) {
        analyseRepository.deleteById(id);
    }
}
