package tn.jmal.controlequaliteservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.controlequaliteservice.Entity.Historique;
import tn.jmal.controlequaliteservice.Repository.HistoriqueRepository;

@Service
public class HistoriqueService {

    @Autowired
    private HistoriqueRepository historiqueRepository;

    public Historique saveHistorique(Historique historique) {
        return historiqueRepository.save(historique);
    }

    public Historique getHistoriqueById(Long id) {
        return historiqueRepository.findById(id).orElse(null);
    }

    public void deleteHistorique(Long id) {
        historiqueRepository.deleteById(id);
    }
}
