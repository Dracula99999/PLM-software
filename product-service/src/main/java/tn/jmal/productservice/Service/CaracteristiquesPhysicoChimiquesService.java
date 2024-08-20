package tn.jmal.productservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.productservice.Entity.CaracteristiquesPhysicoChimiques;
import tn.jmal.productservice.Repository.CaracteristiquesPhysicoChimiquesRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristiquesPhysicoChimiquesService {

    @Autowired
    private CaracteristiquesPhysicoChimiquesRepository physicoChimiquesRepository;

    public List<CaracteristiquesPhysicoChimiques> findAll() {
        return physicoChimiquesRepository.findAll();
    }

    public Optional<CaracteristiquesPhysicoChimiques> findById(Long id) {
        return physicoChimiquesRepository.findById(id);
    }

    public CaracteristiquesPhysicoChimiques save(CaracteristiquesPhysicoChimiques physicoChimiques) {
        return physicoChimiquesRepository.save(physicoChimiques);
    }

    public void deleteById(Long id) {
        physicoChimiquesRepository.deleteById(id);
    }

    public Optional<CaracteristiquesPhysicoChimiques> updateCaracteristiquesPhysicoChimiques(Long id, CaracteristiquesPhysicoChimiques physicoChimiquesDetails) {
        Optional<CaracteristiquesPhysicoChimiques> optionalPhysicoChimiques = physicoChimiquesRepository.findById(id);
        if (optionalPhysicoChimiques.isPresent()) {
            CaracteristiquesPhysicoChimiques existingPhysicoChimiques = optionalPhysicoChimiques.get();
            updateExistingPhysicoChimiques(existingPhysicoChimiques, physicoChimiquesDetails);
            return Optional.of(physicoChimiquesRepository.save(existingPhysicoChimiques));
        } else {
            return Optional.empty();
        }
    }

    private void updateExistingPhysicoChimiques(CaracteristiquesPhysicoChimiques existing, CaracteristiquesPhysicoChimiques details) {
        existing.setPHMin(details.getPHMin());
        existing.setPHValidation(details.getPHValidation());
        existing.setPHMax(details.getPHMax());
        existing.setVMin(details.getVMin());
        existing.setVValidation(details.getVValidation());
        existing.setVMax(details.getVMax());
        existing.setDensite20C(details.getDensite20C());
        existing.setAspect(details.getAspect());
        existing.setDchl(details.getDchl());
        existing.setAlcaliLibreNaOH(details.getAlcaliLibreNaOH());
        existing.setDetartrant(details.getDetartrant());
    }
}
