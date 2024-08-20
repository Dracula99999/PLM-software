package tn.jmal.userstock.Service;

import tn.jmal.userstock.Entities.Stock;
import tn.jmal.userstock.Repository.StockRepository;
import tn.jmal.userstock.client.MatierePremiereClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.productservice.Entity.MatierePremiere;

import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Optional<Stock> getStockById(Long id) {
        return stockRepository.findById(id);
    }



    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
    @Autowired
    private MatierePremiereClient matierePremiereClient;
    public Stock saveStock(Stock controleQualite) {
        Optional<MatierePremiere> matierePremiereOptional = matierePremiereClient.getMatierePremiereById(controleQualite.getMatierePremiereId());

        if (matierePremiereOptional.isPresent()) {
            return stockRepository.save(controleQualite);
        } else {
            throw new RuntimeException("MatierePremiere non trouvée avec l'ID : " + controleQualite.getMatierePremiereId());
        }
    }
}