package tn.jmal.productservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tn.jmal.productservice.Entity.*;
import tn.jmal.productservice.Repository.*;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Date;

@SpringBootApplication
public class ProductServiceApplication implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private CategorieParentRepository categorieParentRepository;

    @Autowired
    private CaracteristiquesPhysicoChimiquesRepository caracteristiquesPhysicoChimiquesRepository;

    @Autowired
    private CaracteristiquesOrganoleptiquesRepository caracteristiquesOrganoleptiquesRepository;

    @Autowired
    private MatierePremiereRepository matierePremiereRepository;

    @Autowired
    private LibrairieRepository librairieRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;


    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        // Create parent categories
        CategorieParent parentCategory1 = new CategorieParent(null, "PF/Entretien de la vaisselle");
        CategorieParent parentCategory2 = new CategorieParent(null, "PF/Entretien du linge");
        CategorieParent parentCategory3 = new CategorieParent(null, "PF/Produit Multi-usage");
        CategorieParent parentCategory4 = new CategorieParent(null, "PF/Hygiene et soin personnel");
        CategorieParent parentCategory5 = new CategorieParent(null, "PF/Entretien du sol");
        CategorieParent parentCategory6 = new CategorieParent(null, "PF/Désinfectant et Nettoyant");

        categorieParentRepository.save(parentCategory1);
        categorieParentRepository.save(parentCategory2);
        categorieParentRepository.save(parentCategory3);
        categorieParentRepository.save(parentCategory4);
        categorieParentRepository.save(parentCategory5);
        categorieParentRepository.save(parentCategory6);

        // Create categories
        Categorie category1 = new Categorie(null, "Liquide vaisselle à main", parentCategory1);
        Categorie category2 = new Categorie(null, "Liquide linge Automatique", parentCategory2);
        Categorie category3 = new Categorie(null, "Liquide linge à main/SA", parentCategory2);
        Categorie category4 = new Categorie(null, "Pâte à linge à main/SA", parentCategory2);
        Categorie category5 = new Categorie(null, "Pâte à linge Automatique", parentCategory2);
        Categorie category6 = new Categorie(null, "Produit Multi-usage", parentCategory3);
        Categorie category7 = new Categorie(null, "Entretien du linge", parentCategory2);
        Categorie category8 = new Categorie(null, "Hygiene et soin personnel", parentCategory4);
        Categorie category9 = new Categorie(null, "Entretien du sol", parentCategory5);
        Categorie category10 = new Categorie(null, "Désinfectant et Nettoyant", parentCategory6);

        categorieRepository.save(category1);
        categorieRepository.save(category2);
        categorieRepository.save(category3);
        categorieRepository.save(category4);
        categorieRepository.save(category5);
        categorieRepository.save(category6);
        categorieRepository.save(category7);
        categorieRepository.save(category8);
        categorieRepository.save(category9);
        categorieRepository.save(category10);

        // Create products
        Product product1 = new Product(null, "Alys Pomme", "0.65L-1L-2L-5L-Vrac", 4, category1, null, null);
        Product product2 = new Product(null, "Alys Citron", "0.65L-1L-2L-5L", 4, category1, null, null);
        Product product3 = new Product(null, "Ghassel Citron", "1L-2L-5L", 3, category1, null, null);
        Product product4 = new Product(null, "Class bleu", "2L-3L-5L", 3, category2, null, null);
        Product product5 = new Product(null, "Class vert", "2L-3L-5L", 3, category2, null, null);
        Product product6 = new Product(null, "Finesse transparent", "1L-2L-3L-5L", 4, category3, null, null);
        Product product7 = new Product(null, "Pâte bleu SA", "3Kg-5Kg", 2, category4, null, null);
        Product product8 = new Product(null, "Pâte Mouin Auto", "3Kg-5Kg", 2, category5, null, null);
        Product product9 = new Product(null, "Pâte blanche SA", "1.2Kg-3Kg-5Kg", 3, category4, null, null);
        Product product10 = new Product(null, "Pâte citron LT", "1.2Kg-3Kg-5Kg", 3, category6, null, null);
        Product product11 = new Product(null, "Bisol Floral", "2L-5L", 2, category6, null, null);
        Product product12 = new Product(null, "Bisol Fraicheur Vert", "2L-5L", 2, category6, null, null);
        Product product13 = new Product(null, "Douceline rose", "1L-2L-3L-5L", 4, category7, null, null);
        Product product14 = new Product(null, "Douceline bleu", "1L-2L-3L-5L", 4, category7, null, null);
        Product product15 = new Product(null, "Line Pêche", "0.37L-2L-3L", 3, category8, null, null);
        Product product16 = new Product(null, "Line océan", "0.37L-2L-3L", 3, category8, null, null);
        Product product17 = new Product(null, "Line menthe", "0.37L-2L-3L", 3, category8, null, null);
        Product product18 = new Product(null, "Fawah blanc", "0.9L-1L-2L-5L", 4, category9, null, null);
        Product product19 = new Product(null, "Bassatine rose", "0.9L-2L-5L", 3, category9, null, null);
        Product product20 = new Product(null, "Bassatine lavande", "0.9L-2L-5L", 3, category9, null, null);
        Product product21 = new Product(null, "Super Lavande", "5L", 1, category9, null, null);
        Product product22 = new Product(null, "Lis rose", "1L", 1, category9, null, null);
        Product product23 = new Product(null, "Lis vert", "1L", 1, category9, null, null);
        Product product24 = new Product(null, "Class Net Rose", "1L", 1, category9, null, null);
        Product product25 = new Product(null, "Class Net Vert", "1L", 1, category9, null, null);
        Product product26 = new Product(null, "Parfum pour linge nerolie", "0.1L", 1, category7, null, null);
        Product product27 = new Product(null, "Parfum pour linge muget", "0.1L", 1, category7, null, null);
        Product product28 = new Product(null, "Parfum pour linge senteur de bois", "0.1L", 1, category7, null, null);
        Product product29 = new Product(null, "Lave vitre", "0.5L-1L-5L", 3, category10, null, null);
        Product product30 = new Product(null, "Lave auto", "Vrac", 1, category10, null, null);
        Product product31 = new Product(null, "Ghassel WC", "0.9L-Vrac", 1, category10, null, null);
        Product product32 = new Product(null, "Mouzil", "1L-Vrac", 1, category10, null, null);
        Product product33 = new Product(null, "Eau de Javel", "0.9L-2L-5L-vrac", 3, category10, null, null);
        Product product34 = new Product(null, "Eau de Javel semi concentrée", "vrac", 0, category10, null, null);
        Product product35 = new Product(null, "Eau de Javel concentrée", "vrac", 0, category10, null, null);

        productRepository.saveAll(List.of(product1, product2, product3, product4, product5, product6, product7, product8, product9,
                product10, product11, product12, product13, product14, product15, product16, product17, product18, product19,
                product20, product21, product22, product23, product24, product25, product26, product27, product28, product29,
                product30, product31, product32, product33, product34, product35));

        // Create and associate CaracteristiquesPhysicoChimiques with the products
        CaracteristiquesPhysicoChimiques caract1 = new CaracteristiquesPhysicoChimiques(null, 6.50, 7.00, 7.50, "3250", "3500", "3750", 1.02, "Voir Référence", 0, 0, 0, product1);
        CaracteristiquesPhysicoChimiques caract2 = new CaracteristiquesPhysicoChimiques(null, 6.50, 7.00, 7.50, "3250", "3500", "3750", 1.02648, "Voir Référence", 0, 0, 0, product2);
        CaracteristiquesPhysicoChimiques caract3 = new CaracteristiquesPhysicoChimiques(null, 6.50, 7.00, 7.50, "3250", "3500", "3750", 1.02648, "Voir Référence", 0, 0, 0, product3);
        CaracteristiquesPhysicoChimiques caract4 = new CaracteristiquesPhysicoChimiques(null, 8.00, 8.50, 9.50, "2800", "3000", "3200", 1.00754, "Voir Référence", 0, 0, 0, product4);
        CaracteristiquesPhysicoChimiques caract5 = new CaracteristiquesPhysicoChimiques(null, 8.00, 8.50, 9.50, "2800", "3000", "3200", 1.00784, "Voir Référence", 0, 0, 0, product5);
        CaracteristiquesPhysicoChimiques caract6 = new CaracteristiquesPhysicoChimiques(null, 7.20, 7.50, 7.80, "4000", "4000", "4400", 1.02570, "Voir Référence", 0, 0, 0, product6);
        CaracteristiquesPhysicoChimiques caract7 = new CaracteristiquesPhysicoChimiques(null, 8.00, 9.00, 10.00, "24000", "29000", "34000", 1.17588, "Voir Référence", 0, 0, 0, product7);
        CaracteristiquesPhysicoChimiques caract8 = new CaracteristiquesPhysicoChimiques(null, 8.00, 9.00, 10.00, "24000", "29000", "34000", 1.17612, "Voir Référence", 0, 0, 0, product8);
        CaracteristiquesPhysicoChimiques caract9 = new CaracteristiquesPhysicoChimiques(null, 8.00, 9.00, 10.00, "24000", "29000", "34000", 1.16792, "Voir Référence", 0, 0, 0, product9);
        CaracteristiquesPhysicoChimiques caract10 = new CaracteristiquesPhysicoChimiques(null, 8.00, 9.00, 10.00, "24000", "29000", "34000", 1.17498, "Voir Référence", 0, 0, 0, product10);
        CaracteristiquesPhysicoChimiques caract11 = new CaracteristiquesPhysicoChimiques(null, 6.50, 7.00, 7.50, "1400", "1600", "1500", 1.02000, "Voir Référence", 0, 0, 0, product11);
        CaracteristiquesPhysicoChimiques caract12 = new CaracteristiquesPhysicoChimiques(null, 6.50, 7.00, 7.50, "1400", "1500", "1600", 1.02000, "Voir Référence", 0, 0, 0, product12);
        CaracteristiquesPhysicoChimiques caract13 = new CaracteristiquesPhysicoChimiques(null, 2.00, 3.00, 4.00, "800", "1000", "1200", 0.96674, "Voir Référence", 0, 0, 0, product13);
        CaracteristiquesPhysicoChimiques caract14 = new CaracteristiquesPhysicoChimiques(null, 2.00, 3.00, 4.00, "800", "1000", "1200", 0.96674, "Voir Référence", 0, 0, 0, product14);
        CaracteristiquesPhysicoChimiques caract15 = new CaracteristiquesPhysicoChimiques(null, 7.20, 7.50, 7.80, "2800", "3000", "3200", 1.02210, "Voir Référence", 0, 0, 0, product15);
        CaracteristiquesPhysicoChimiques caract16 = new CaracteristiquesPhysicoChimiques(null, 7.20, 7.50, 7.80, "2800", "3000", "3200", 1.01930, "Voir Référence", 0, 0, 0, product16);
        CaracteristiquesPhysicoChimiques caract17 = new CaracteristiquesPhysicoChimiques(null, 7.20, 7.50, 7.80, "2800", "3000", "3200", 1.02094, "Voir Référence", 0, 0, 0, product17);
        CaracteristiquesPhysicoChimiques caract18 = new CaracteristiquesPhysicoChimiques(null, 6.00, 7.00, 8.00, "liquide", "liquide", "liquide", 0.99160, "Voir Référence", 0, 0, 0, product18);
        CaracteristiquesPhysicoChimiques caract19 = new CaracteristiquesPhysicoChimiques(null, 4.00, 6.00, 8.00, "liquide", "liquide", "liquide", 0.99488, "Voir Référence", 0, 0, 0, product19);
        CaracteristiquesPhysicoChimiques caract20 = new CaracteristiquesPhysicoChimiques(null, 4.00, 6.00, 8.00, "liquide", "liquide", "liquide", 0.99444, "Voir Référence", 0, 0, 0, product20);
        CaracteristiquesPhysicoChimiques caract21 = new CaracteristiquesPhysicoChimiques(null, 4.00, 6.00, 8.00, "liquide", "liquide", "liquide", 0.99588, "Voir Référence", 0, 0, 0, product21);
        CaracteristiquesPhysicoChimiques caract22 = new CaracteristiquesPhysicoChimiques(null, 4.00, 6.00, 8.00, "liquide", "liquide", "liquide", 0.99806, "Voir Référence", 0, 0, 0, product22);
        CaracteristiquesPhysicoChimiques caract23 = new CaracteristiquesPhysicoChimiques(null, 4.00, 6.00, 8.00, "liquide", "liquide", "liquide", 0.99448, "Voir Référence", 0, 0, 0, product23);
        CaracteristiquesPhysicoChimiques caract24 = new CaracteristiquesPhysicoChimiques(null, 4.00, 6.00, 8.00, "liquide", "liquide", "liquide", 0.99608, "Voir Référence", 0, 0, 0, product24);
        CaracteristiquesPhysicoChimiques caract25 = new CaracteristiquesPhysicoChimiques(null, 4.00, 6.00, 8.00, "liquide", "liquide", "liquide", 0.99808, "Voir Référence", 0, 0, 0, product25);
        CaracteristiquesPhysicoChimiques caract26 = new CaracteristiquesPhysicoChimiques(null, 6.00, 7.00, 8.00, "liquide", "liquide", "liquide", 0.99100, "Voir Référence", 0, 0, 0, product26);
        CaracteristiquesPhysicoChimiques caract27 = new CaracteristiquesPhysicoChimiques(null, 6.00, 7.00, 8.00, "liquide", "liquide", "liquide", 1.01000, "Voir Référence", 0, 0, 0, product27);
        CaracteristiquesPhysicoChimiques caract28 = new CaracteristiquesPhysicoChimiques(null, 6.00, 7.00, 8.00, "liquide", "liquide", "liquide", 1.00600, "Voir Référence", 0, 0, 0, product28);
        CaracteristiquesPhysicoChimiques caract29 = new CaracteristiquesPhysicoChimiques(null, 3.00, 0, 7.00, "liquide", "liquide", "liquide", 0.98342, "Voir Référence", 12.3, 10.52, 8.49, product29);
        CaracteristiquesPhysicoChimiques caract30 = new CaracteristiquesPhysicoChimiques(null, 7.00, 7.50, 8.00, "2400", "2500", "2600", 1.02920, "Voir Référence", 0, 0, 0, product30);
        CaracteristiquesPhysicoChimiques caract31 = new CaracteristiquesPhysicoChimiques(null, 2, 2, 2, "liquide", "liquide", "liquide", 1.04, "Voir Référence", 0, 0, 0, product31);
        CaracteristiquesPhysicoChimiques caract32 = new CaracteristiquesPhysicoChimiques(null, 2, 2, 2, "liquide", "liquide", "liquide", 1.01283, "Voir Référence", 0, 0, 0, product32);
        CaracteristiquesPhysicoChimiques caract33 = new CaracteristiquesPhysicoChimiques(null, 6.00, 7.00, 8.00, "liquide", "liquide", "liquide", 1.056, "Voir Référence", 12.3, 10.52, 8.49, product33);
        CaracteristiquesPhysicoChimiques caract34 = new CaracteristiquesPhysicoChimiques(null, 6.00, 7.00, 8.00, "liquide", "liquide", "liquide", 1.094, "Voir Référence", 22, 25, 16, product34);
        //CaracteristiquesPhysicoChimiques caract35 = new CaracteristiquesPhysicoChimiques(null, 6.00, 7.00, 8.00, "liquide", "liquide", "liquide", 1.230, "Voir Référence", 47, 3.5, product35);


        caracteristiquesPhysicoChimiquesRepository.saveAll(List.of(caract1, caract2, caract3, caract4, caract5, caract6, caract7, caract8, caract9, caract10,
                caract11, caract12, caract13, caract14, caract15, caract16, caract17, caract18, caract19, caract20,
                caract21, caract22, caract23, caract24, caract25, caract26, caract27, caract28, caract29, caract30,
                caract31, caract32, caract33, caract34));

        // Create and associate CaracteristiquesOrganoleptiques with the products
        CaracteristiquesOrganoleptiques organoleptiques1 = new CaracteristiquesOrganoleptiques(null, "GREEN APPLE-GA668", "vert", product1);
        CaracteristiquesOrganoleptiques organoleptiques2 = new CaracteristiquesOrganoleptiques(null, "Fraicheur 904/ Zeste de CITRON 03H MOD 2", "Jaune ", product2);
        CaracteristiquesOrganoleptiques organoleptiques3 = new CaracteristiquesOrganoleptiques(null, "Fraicheur 904 /Zeste de CITRON 03H MOD 2", "jaune ", product3);
        CaracteristiquesOrganoleptiques organoleptiques4 = new CaracteristiquesOrganoleptiques(null, "Purple Violette AR602381 et VBU571 'capsule'", "bleu", product4);
        CaracteristiquesOrganoleptiques organoleptiques5 = new CaracteristiquesOrganoleptiques(null, "Muriel SF131854 et VBU571 'capsule'", "vert", product5);
        CaracteristiquesOrganoleptiques organoleptiques6 = new CaracteristiquesOrganoleptiques(null, "Purple Violette AR602381", "transparent avec nuance bleu", product6);
        CaracteristiquesOrganoleptiques organoleptiques7 = new CaracteristiquesOrganoleptiques(null, "Boroa laundry AR444463", "bleu", product7);
        CaracteristiquesOrganoleptiques organoleptiques8 = new CaracteristiquesOrganoleptiques(null, "Boroa laundry AR444463", "bleu", product8);
        CaracteristiquesOrganoleptiques organoleptiques9 = new CaracteristiquesOrganoleptiques(null, "santal New AR 637563", "blanc", product9);
        CaracteristiquesOrganoleptiques organoleptiques10 = new CaracteristiquesOrganoleptiques(null, "Fraicheur 904/ Zeste de CITRON 03H MOD 2", "blanc", product10);
        CaracteristiquesOrganoleptiques organoleptiques11 = new CaracteristiquesOrganoleptiques(null, "reve d'or", "rose ", product11);
        CaracteristiquesOrganoleptiques organoleptiques12 = new CaracteristiquesOrganoleptiques(null, "Menthe 3 Mod AR587584 et Fraicheur 904 GREEN APPLE-GA668", "Vert", product12);
        CaracteristiquesOrganoleptiques organoleptiques13 = new CaracteristiquesOrganoleptiques(null, "Boroa laundry AR444463", "rose", product13);
        CaracteristiquesOrganoleptiques organoleptiques14 = new CaracteristiquesOrganoleptiques(null, "santal New AR 637563", "bleu", product14);
        CaracteristiquesOrganoleptiques organoleptiques15 = new CaracteristiquesOrganoleptiques(null, "pêche AR 480488", "orangé", product15);
        CaracteristiquesOrganoleptiques organoleptiques16 = new CaracteristiquesOrganoleptiques(null, "Pau 2 SL148624", "bleu", product16);
        CaracteristiquesOrganoleptiques organoleptiques17 = new CaracteristiquesOrganoleptiques(null, "Menthe 3 Mod AR587584", "vert", product17);
        CaracteristiquesOrganoleptiques organoleptiques18 = new CaracteristiquesOrganoleptiques(null, "Oriental AR602382/Espace fort 2SL163231", "blanc ", product18);
        CaracteristiquesOrganoleptiques organoleptiques19 = new CaracteristiquesOrganoleptiques(null, "Rose PC37699", "rose ", product19);
        CaracteristiquesOrganoleptiques organoleptiques20 = new CaracteristiquesOrganoleptiques(null, "Cœur Lavande 2 AR617850", "bleu ", product20);
        CaracteristiquesOrganoleptiques organoleptiques21 = new CaracteristiquesOrganoleptiques(null, "Cœur Lavande 2 AR617850", "violet ", product21);
        CaracteristiquesOrganoleptiques organoleptiques22 = new CaracteristiquesOrganoleptiques(null, "Flor PF42205", "rose", product22);
        CaracteristiquesOrganoleptiques organoleptiques23 = new CaracteristiquesOrganoleptiques(null, "Musky flor II SL120054", "vert", product23);
        CaracteristiquesOrganoleptiques organoleptiques24 = new CaracteristiquesOrganoleptiques(null, "Flor PF42205", "rose", product24);
        CaracteristiquesOrganoleptiques organoleptiques25 = new CaracteristiquesOrganoleptiques(null, "Musky flor II SL120054", "Vert", product25);
        CaracteristiquesOrganoleptiques organoleptiques26 = new CaracteristiquesOrganoleptiques(null, "NEROLI SL126955", "incolore", product26);
        CaracteristiquesOrganoleptiques organoleptiques27 = new CaracteristiquesOrganoleptiques(null, "REFRESHED LAUNDRY 75", "incolore", product27);
        CaracteristiquesOrganoleptiques organoleptiques28 = new CaracteristiquesOrganoleptiques(null, "Purple Violette AR602381", "incolore", product28);
        CaracteristiquesOrganoleptiques organoleptiques29 = new CaracteristiquesOrganoleptiques(null, "Fraicheur 904/ Zeste de CITRON 03H MOD 2", "bleu", product29);
        CaracteristiquesOrganoleptiques organoleptiques30 = new CaracteristiquesOrganoleptiques(null, "Flor PF42205", "rouge", product30);
        CaracteristiquesOrganoleptiques organoleptiques31 = new CaracteristiquesOrganoleptiques(null, "santal New AR 637563", "jaune", product31);
        CaracteristiquesOrganoleptiques organoleptiques32 = new CaracteristiquesOrganoleptiques(null, "Cœur Lavande 2 AR617850", "jaune", product32);
        CaracteristiquesOrganoleptiques organoleptiques33 = new CaracteristiquesOrganoleptiques(null, "Musky flor II SL120054", "jaune", product33);
        CaracteristiquesOrganoleptiques organoleptiques34 = new CaracteristiquesOrganoleptiques(null, "Rose PC37699", "blanc", product34);

        caracteristiquesOrganoleptiquesRepository.saveAll(List.of(organoleptiques1, organoleptiques2, organoleptiques3, organoleptiques4, organoleptiques5, organoleptiques6, organoleptiques7, organoleptiques8, organoleptiques9, organoleptiques10, organoleptiques11, organoleptiques12, organoleptiques13, organoleptiques14, organoleptiques15, organoleptiques16, organoleptiques17, organoleptiques18, organoleptiques19, organoleptiques20, organoleptiques21, organoleptiques22, organoleptiques23, organoleptiques24, organoleptiques25, organoleptiques26, organoleptiques27, organoleptiques28, organoleptiques29, organoleptiques30, organoleptiques31, organoleptiques32, organoleptiques33, organoleptiques34));

        CategorieParent parentCategoryMP = new CategorieParent(null, "MP");
        categorieParentRepository.save(parentCategoryMP);

        Categorie categorieAcide = new Categorie(null, "Acide méthylsulfonique", parentCategoryMP);
        Categorie categorieAdjuvents = new Categorie(null, "IPA-Alcool isopropylique", parentCategoryMP);

        categorieRepository.save(categorieAcide);
        categorieRepository.save(categorieAdjuvents);

        MatierePremiere mp1 = new MatierePremiere(
                null, categorieAcide, "Lutropur MSA",null, "BASF", "ACD0000001", 60, "Observation 1",
                LocalDate.now(), "provenance1", "natureProduit1", "designation1", "codeERP1", "numLot1",
                "dlc1", "quantite1", "ph1", "densite1", "aspect1", "proprete1", "apparence1",
                "indiceRefraction1", "MMA1", "MAC1", "MANT1", "couleur1", "echelleIntensite1",
                "quantiteDeg1", "codeCouleur1", "decisionObservation1", "arrivageNum1"
        );

        MatierePremiere mp2 = new MatierePremiere(
                null, categorieAcide, "Acide acétique glacial FG E260 99,87",null, "STE IMPRONTA DU COMMERCE", "ACD0000003", 60, "Observation 2",
                LocalDate.now(), "provenance2", "natureProduit2", "designation2", "codeERP2", "numLot2",
                "dlc2", "quantite2", "ph2", "densite2", "aspect2", "proprete2", "apparence2",
                "indiceRefraction2", "MMA2", "MAC2", "MANT2", "couleur2", "echelleIntensite2",
                "quantiteDeg2", "codeCouleur2", "decisionObservation2", "arrivageNum2"
        );

        MatierePremiere mp3 = new MatierePremiere(
                null, categorieAcide, "détarant 8%",null, "NITROKYM", "WC0000001", 198, "Observation 3",
                LocalDate.now(), "provenance3", "natureProduit3", "designation3", "codeERP3", "numLot3",
                "dlc3", "quantite3", "ph3", "densite3", "aspect3", "proprete3", "apparence3",
                "indiceRefraction3", "MMA3", "MAC3", "MANT3", "couleur3", "echelleIntensite3",
                "quantiteDeg3", "codeCouleur3", "decisionObservation3", "arrivageNum3"
        );

        MatierePremiere mp4 = new MatierePremiere(
                null, categorieAdjuvents, "ISOPROPANOL UN1219",null, "SATER", "ALC0000001", 59, "Observation 4",
                LocalDate.now(), "provenance4", "natureProduit4", "designation4", "codeERP4", "numLot4",
                "dlc4", "quantite4", "ph4", "densite4", "aspect4", "proprete4", "apparence4",
                "indiceRefraction4", "MMA4", "MAC4", "MANT4", "couleur4", "echelleIntensite4",
                "quantiteDeg4", "codeCouleur4", "decisionObservation4", "arrivageNum4"
        );

        matierePremiereRepository.saveAll(List.of(mp1, mp2, mp3, mp4));


        String filePath = uploadDir + "FT Lutropur MSA PDS.pdf";
        byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

        // Création de l'objet Librairie
        Librairie librairie = new Librairie(null, "Nom du document", "FR", LocalDate.now(), LocalDate.now(), LocalDate.now(), "Utilisateur", LocalDate.now(), fileContent, mp1);
        librairieRepository.save(librairie);



        System.out.println("Matières premières ajoutées avec succès");

        System.out.println("Product, category, and parent category added successfully");
    }
}
