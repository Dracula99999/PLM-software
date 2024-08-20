package tn.jmal.productservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.productservice.Entity.CategorieParent;
import tn.jmal.productservice.Repository.CategorieParentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategorieParentService {

    @Autowired
    private CategorieParentRepository categorieParentRepository;

    public List<CategorieParent> findAll() {
        return categorieParentRepository.findAll();
    }

    public Optional<CategorieParent> findById(Long id) {
        return categorieParentRepository.findById(id);
    }

    public CategorieParent save(CategorieParent categorieParent) {
        return categorieParentRepository.save(categorieParent);
    }

    public void deleteById(Long id) {
        categorieParentRepository.deleteById(id);
    }

    public Optional<CategorieParent> updateCategorieParent(Long id, CategorieParent categorieParentDetails) {
        Optional<CategorieParent> optionalCategorieParent = categorieParentRepository.findById(id);
        if (optionalCategorieParent.isPresent()) {
            CategorieParent existingCategorieParent = optionalCategorieParent.get();
            existingCategorieParent.setDesignation(categorieParentDetails.getDesignation());
            return Optional.of(categorieParentRepository.save(existingCategorieParent));
        } else {
            return Optional.empty();
        }
    }
}
