package tn.jmal.controlequaliteservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import tn.jmal.controlequaliteservice.Entity.*;
import tn.jmal.controlequaliteservice.Service.*;
import tn.jmal.controlequaliteservice.client.MatierePremiereClient;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
@EnableFeignClients
public class ControleQualiteServiceApplication implements CommandLineRunner {

    @Autowired
    private ControleQualiteService controleQualiteService;

    @Autowired
    private MatierePremiereClient productServiceClient;

    @Autowired
    private AnalyseService analyseService;

    @Autowired
    private ModeOperatoireService modeOperatoireService;
    @Autowired
    private HistoriqueService historiqueService;

    @Autowired
    private ControleQualiteEnCoursDeMelangeService controleQualiteEnCoursDeMelangeService;


    public static void main(String[] args) {
        SpringApplication.run(ControleQualiteServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        long matierePremiereId = 1L;

        Optional<MatierePremiere> matierePremiereOptional = productServiceClient.getMatierePremiereById(matierePremiereId);

        if (matierePremiereOptional.isPresent()) {
            MatierePremiere matierePremiere = matierePremiereOptional.get();
            System.out.println("MatierePremiere trouvée: " + matierePremiere);
            ControleQualite controleQualite = new ControleQualite();
            controleQualite.setMatierePremiereId(matierePremiere.getId());
            controleQualite.setDesignation("Qualité A");
            controleQualite.setDateReception(LocalDate.now());
            controleQualite.setTailleLot("100kg");
            controleQualite.setUnite("kg");
            controleQualite.setDatePrelevement(LocalDate.now().minusDays(1));
            controleQualite.setDateAnalyse(LocalDate.now());
            controleQualite.setOperateur("Opérateur A");
            controleQualite.setAcceptance("Accepté");
            controleQualite.setDateAcceptance(LocalDate.now());
            controleQualite.setValidatedBy("Valideur A");

            // Ajouter Analyse
            Analyse analyse = new Analyse();
            analyse.setControleQualite(controleQualite);
            analyse.setAspect("Aspect Test");
            analyse.setAspectValMax(1.0);
            analyse.setAspectValMin(0.5);
            analyse.setAspectSpecification("Spec Test");
            analyse.setAspectValeurActuelle(0.8);
            analyse.setAspectResultat(0.8);
            analyse.setControleQualite(controleQualite);
            analyseService.saveAnalyse(analyse); // Méthode dans le service Analyse

            // Ajouter ModeOpératoire
            ModeOperatoire modeOperatoire = new ModeOperatoire();
            modeOperatoire.setDescription("Description du mode opératoire");
            modeOperatoire.setMatierePremiereId(matierePremiere.getId());
            modeOperatoireService.saveModeOperatoire(modeOperatoire); // Méthode dans le service ModeOperatoire

            // Ajouter Historique
            Historique historique = new Historique();
            historique.setDate(LocalDate.now());
            historique.setPar("Utilisateur");
            historiqueService.saveHistorique(historique); // Méthode dans le service Historique

            controleQualiteService.saveControleQualite(controleQualite);

            System.out.println("ControleQualite ajouté avec succès !");


            // **Création et enregistrement de ControleQualiteEnCoursDeMelange**
            ControleQualiteEnCoursDeMelange controleQualiteEnCoursDeMelange = new ControleQualiteEnCoursDeMelange();
            controleQualiteEnCoursDeMelange.setMatierePremiereId(matierePremiere.getId());
            controleQualiteEnCoursDeMelange.setDesignation("Qualité en cours de mélange");
            //controleQualiteEnCoursDeMelange.setDateDebutControl(Date.from().now());
            controleQualiteEnCoursDeMelange.setMalaxeur("Malaxeur A");
            controleQualiteEnCoursDeMelange.setNumeroLot("Lot-001");
            controleQualiteEnCoursDeMelange.setTemperatureValidation(25.0);
            controleQualiteEnCoursDeMelange.setAcceptance("En cours");
            controleQualiteEnCoursDeMelange.setVisaTechCQ("Tech A");
            controleQualiteEnCoursDeMelange.setVisaRespCQ("Resp A");
            //controleQualiteEnCoursDeMelange.setDateCloture(Date.from().now().plusDays(2).atStartOfDay());

            // Ajout des paramètres de mesure (exemple)
            ParametreMesure parametreMesure = new ParametreMesure();
            parametreMesure.setControleQualite(controleQualiteEnCoursDeMelange);  // lien avec ControleQualite
            parametreMesure.setDateEtHeure(LocalDate.now().atTime(10, 0));
            parametreMesure.setNatureEchantillon("Nature A");
            parametreMesure.setPH(7.0);
            parametreMesure.setViscosite(1.5);
            parametreMesure.setTemperature(25.0);
            parametreMesure.setOdeur("Neutre");
            parametreMesure.setCouleur("Blanc");
            parametreMesure.setAspect("Aspect B");
            parametreMesure.setDensite(1.0);
            parametreMesure.setDetergentPourcentage(10.0);
            parametreMesure.setDPH(0.5);
            parametreMesure.setAlcalilibre(0.2);
            parametreMesure.setAutre("Autre A");
            parametreMesure.setObservations("Observation A");

            controleQualiteEnCoursDeMelange.setParametreMesure(parametreMesure);

            controleQualiteEnCoursDeMelangeService.createControleQualite(controleQualiteEnCoursDeMelange);

            System.out.println("ControleQualiteEnCoursDeMelange ajouté avec succès !");

        } else {
            System.out.println("MatierePremiere non trouvée !");
        }
    }
}