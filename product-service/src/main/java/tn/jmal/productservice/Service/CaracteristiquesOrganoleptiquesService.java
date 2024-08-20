package tn.jmal.productservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.productservice.Entity.CaracteristiquesOrganoleptiques;
import tn.jmal.productservice.Entity.CaracteristiquesPhysicoChimiques;
import tn.jmal.productservice.Repository.CaracteristiquesOrganoleptiquesRepository;
import tn.jmal.productservice.Repository.CaracteristiquesPhysicoChimiquesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristiquesOrganoleptiquesService {

    @Autowired
    private CaracteristiquesOrganoleptiquesRepository organoleptiquesRepository;

    public List<CaracteristiquesOrganoleptiques> findAll() {
        return organoleptiquesRepository.findAll();
    }

    public Optional<CaracteristiquesOrganoleptiques> findById(Long id) {
        return organoleptiquesRepository.findById(id);
    }

    public CaracteristiquesOrganoleptiques save(CaracteristiquesOrganoleptiques physicoChimiques) {
        return organoleptiquesRepository.save(physicoChimiques);
    }

    public void deleteById(Long id) {
        organoleptiquesRepository.deleteById(id);
    }

    public Optional<CaracteristiquesOrganoleptiques> updateCaracteristiquesOrganoleptiques(Long id, CaracteristiquesOrganoleptiques physicoChimiquesDetails) {
        Optional<CaracteristiquesOrganoleptiques> optionalPhysicoChimiques = organoleptiquesRepository.findById(id);
        if (optionalPhysicoChimiques.isPresent()) {
            CaracteristiquesOrganoleptiques existingPhysicoChimiques = optionalPhysicoChimiques.get();
            updateExistingPhysicoChimiques(existingPhysicoChimiques, physicoChimiquesDetails);
            return Optional.of(organoleptiquesRepository.save(existingPhysicoChimiques));
        } else {
            return Optional.empty();
        }
    }

    private void updateExistingPhysicoChimiques(CaracteristiquesOrganoleptiques existing, CaracteristiquesOrganoleptiques details) {
        existing.setCouleur(details.getCouleur());
        existing.setOdeur(details.getOdeur());

    }
}
