package tn.jmal.productservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.productservice.Entity.Librairie;
import tn.jmal.productservice.Entity.MatierePremiere;
import tn.jmal.productservice.Repository.LibrairieRepository;
import tn.jmal.productservice.Repository.MatierePremiereRepository;

import java.util.List;

@Service
public class LibrairieService {
    @Autowired
    private LibrairieRepository librairieRepository;

    @Autowired
    private MatierePremiereRepository matierePremiereRepository;

    public List<Librairie> getAllLibrairie() {
        return librairieRepository.findAll();
    }

    public Librairie getLibrairieById(Long id) {
        return librairieRepository.findById(id).orElse(null);
    }

    public List<Librairie> getLibrairieByMatierePremiere(Long matierePremiereId) {
        MatierePremiere matierePremiere = new MatierePremiere();
        matierePremiere.setId(matierePremiereId);
        return librairieRepository.findByMatierePremiere(matierePremiere);
    }

    public Librairie saveLibrairie(Librairie librairie) {
        return librairieRepository.save(librairie);
    }

    public void deleteLibrairie(Long id) {
        librairieRepository.deleteById(id);
    }
}
