package tn.jmal.projectservice.Repositories;

import tn.jmal.projectservice.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ServiceRepository extends JpaRepository<Service, Long>  {
    Optional<Service> findByNom(String nom);

}
