package tn.jmal.projectservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tn.jmal.projectservice.Entities.Projet;
import tn.jmal.projectservice.Entities.Service;
import tn.jmal.projectservice.Repositories.ProjetRepository;
import tn.jmal.projectservice.Repositories.ServiceRepository;
import tn.jmal.projectservice.Repositories.TacheProjectRepository;
import tn.jmal.projectservice.Repositories.TacheRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class ProjectServiceApplication implements CommandLineRunner {

	@Autowired
	private ProjetRepository projetRepository;

	@Autowired
	private TacheRepository tacheRepository;

	@Autowired
	private TacheProjectRepository tacheProjectRepository;

	@Autowired
	private ServiceRepository serviceRepository;

	public static void main(String[] args) {
		SpringApplication.run(ProjectServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Create sample Services
		Service service1 = new Service();
		service1.setNom("Service A");
		serviceRepository.save(service1);

		Service service2 = new Service();
		service2.setNom("Service B");
		serviceRepository.save(service2);

		// Create sample Projects
		Projet projet1 = new Projet();
		projet1.setTitre("Projet 1");
		projet1.setDateDebut(LocalDate.of(2024, 1, 1));
		projet1.setAvancement(10);
		//projetRepository.save(projet1);

		Projet projet2 = new Projet();
		projet2.setTitre("Projet 2");
		projet2.setDateDebut(LocalDate.of(2024, 2, 2));
		projet2.setAvancement(1);
		//projetRepository.save(projet2);


	}
}