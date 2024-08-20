package tn.jmal.userstock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.List;
import java.util.Optional;
import tn.jmal.userstock.Entities.*;
import tn.jmal.userstock.Repository.*;
import tn.jmal.userstock.client.MatierePremiereClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
@EnableFeignClients
public class UserStockApplication implements CommandLineRunner {
    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private MatierePremiereClient matierePremiereClient;

    @Autowired
    private UserRepository userRepository;
    public static void main(String[] args) {
        SpringApplication.run(UserStockApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {

        User userTest1 =new User(null,"test","test","test","test","58123455","Adresse","Responsable");
        User userTest2 = new User(null, "john.doe@example.com", "password123", "John", "Doe", "5551234567", "123 Main St, Springfield", "Technicien");
        User userTest3 = new User(null, "jane.smith@example.com", "securepass456", "Jane", "Smith", "5559876543", "456 Elm St, Shelbyville", "Technicien");
        User userTest4 = new User(null, "alice.johnson@example.com", "mypassword789", "Alice", "Johnson", "5557654321", "789 Oak St, Capital City", "Agent Achat");
        userRepository.saveAll(List.of(userTest1,userTest2,userTest3,userTest4));

        long matierePremiereId = 1L;

        Optional<MatierePremiere> matierePremiereOptional = matierePremiereClient.getMatierePremiereById(matierePremiereId);

        if (matierePremiereOptional.isPresent()) {
            MatierePremiere matierePremiere = matierePremiereOptional.get();
            System.out.println("MatierePremiere trouvée: " + matierePremiere);

            // Create and save Stock
            Stock stock1 = new Stock();
            stock1.setStockCode("STK001");
            stock1.setMatierePremiereId(matierePremiereId);
            stock1.setQuantite(80);
            Stock stock2 = new Stock();
            stock2.setStockCode("STK002");
            stock2.setQuantite(50);
            Stock stock3 = new Stock();
            stock3.setStockCode("STK003");
            Stock stock4 = new Stock();
            stock4.setStockCode("STK004");
            stockRepository.saveAll(List.of(stock1,stock2,stock3,stock4));


        }
    }
}