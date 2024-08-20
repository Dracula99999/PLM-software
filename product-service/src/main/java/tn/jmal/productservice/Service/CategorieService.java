package tn.jmal.productservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.productservice.Entity.Categorie;
import tn.jmal.productservice.Repository.CategorieRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieService {

    private final CategorieRepository categorieRepository;

    @Autowired
    public CategorieService(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    public List<Categorie> findAll() {

        return categorieRepository.findAll();
    }

    public Optional<Categorie> findById(Long id) {

        return categorieRepository.findById(id);
    }

    public Categorie save(Categorie categorie) {

        return categorieRepository.save(categorie);
    }

    public void deleteById(Long id) {
        categorieRepository.deleteById(id);
    }
    public Optional<Categorie> updateCategorie(Long id, Categorie categorieDetails) {
        Optional<Categorie> optionalCategorie = categorieRepository.findById(id);
        if (optionalCategorie.isPresent()) {
            Categorie existingCategorie = optionalCategorie.get();
            existingCategorie.setLibelle(categorieDetails.getLibelle());
            existingCategorie.setParent(categorieDetails.getParent());
            return Optional.of(categorieRepository.save(existingCategorie));
        } else {
            return Optional.empty();
        }
    }
}
