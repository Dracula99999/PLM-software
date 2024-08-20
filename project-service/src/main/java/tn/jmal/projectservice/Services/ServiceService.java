package tn.jmal.projectservice.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import tn.jmal.projectservice.Entities.Service;
import tn.jmal.projectservice.Repositories.ServiceRepository;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceService {
    @Autowired
    private ServiceRepository serviceRepository;

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
    public Optional<Service> getServiceByName(String nom) {
        return serviceRepository.findByNom(nom);
    }
    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }
    public Optional<Service> getByName(String nom) {
        return serviceRepository.findByNom(nom);
    }



    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service serviceDetails) {
        Optional<Service> optionalService = serviceRepository.findById(id);
        if (optionalService.isPresent()) {
            Service existingService = optionalService.get();
            updateServiceDetails(existingService, serviceDetails);
            return serviceRepository.save(existingService);
        } else {
            return null;
        }
    }
    private void updateServiceDetails(Service existingService, Service newService) {
        existingService.setNom(newService.getNom());
        existingService.setTaches(newService.getTaches());
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}