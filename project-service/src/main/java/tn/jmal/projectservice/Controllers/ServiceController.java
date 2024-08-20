package tn.jmal.projectservice.Controllers;

import tn.jmal.projectservice.Entities.Service;
import tn.jmal.projectservice.Services.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @GetMapping("/services")
    public List<Service> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        Optional<Service> service = serviceService.getServiceById(id);
        return service.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/CreateServices")
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        Service createdService = serviceService.createService(service);
        return ResponseEntity.ok(createdService);
    }

    @PutMapping("/UpdateServices/{id}")
    public ResponseEntity<Service> updateService(@PathVariable Long id, @RequestBody Service serviceDetails) {
        Service updatedService = serviceService.updateService(id, serviceDetails);
        return updatedService != null ? ResponseEntity.ok(updatedService) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/DeleteServices/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
