package tn.jmal.form;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import tn.jmal.productservice.Entity.MatierePremiere;
import tn.jmal.form.Entity.Formulation;
import tn.jmal.form.Entity.MatierePremiereFormulation;
import tn.jmal.form.client.MatierePremiereClient;
import tn.jmal.form.Service.FormulationService;
import org.springframework.boot.CommandLineRunner;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
@EnableFeignClients
public class FormApplication implements CommandLineRunner{
    @Autowired
    private FormulationService formulationService;



    @Autowired
    private MatierePremiereClient matierePremiereClient;

    public static void main(String[] args) {
        SpringApplication.run(FormApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        long matierePremiereId = 1L;

        // Récupérer les informations de la matière première via le client Feign
        Optional<MatierePremiere> matierePremiereOptional = matierePremiereClient.getMatierePremiereById(matierePremiereId);

        if (matierePremiereOptional.isPresent()) {
            MatierePremiere matierePremiere = matierePremiereOptional.get();

            // Créer une nouvelle instance de Formulation
            Formulation formulation = new Formulation();
            formulation.setCodeFormule("CL026-1");
            formulation.setNomFormule("FOND DE TEINT CREME BEIGE");
            formulation.setCodeEssai("CL026-1.1");
            formulation.setDateCreation(LocalDate.now());
            formulation.setTailleEssai(500.0);
            formulation.setStade("Développement");
            formulation.setDateExpiration(LocalDate.of(2024, 7, 3));
            formulation.setNotes("Première note pour la formulation");
            formulation.setObjectif("Créer une nouvelle formule de fond de teint crème beige");

            // Créer une instance de MatierePremiereFormulation et l'ajouter à la nouvelle formulation
            MatierePremiereFormulation mpf = new MatierePremiereFormulation();
            mpf.setCodeMP(matierePremiere.getCode());
            mpf.setAlertes("Aucune");
            mpf.setPourcentage(10.0);
            mpf.setQuantite(50.0);
            mpf.setFormulation(formulation);

            List<MatierePremiereFormulation> matieresPremieres = new ArrayList<>();
            matieresPremieres.add(mpf);
            formulation.setMatieresPremieres(matieresPremieres);





            // Sauvegarder la nouvelle formulation
            formulationService.saveFormulation(formulation);





            System.out.println("Nouvelle formulation créée avec succès !");
        } else {
            System.out.println("Matière première avec ID " + matierePremiereId + " non trouvée.");
        }
    }
}

