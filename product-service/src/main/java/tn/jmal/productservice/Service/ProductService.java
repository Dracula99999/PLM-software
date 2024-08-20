package tn.jmal.productservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.jmal.productservice.Entity.Product;
import tn.jmal.productservice.Repository.CaracteristiquesOrganoleptiquesRepository;
import tn.jmal.productservice.Repository.CaracteristiquesPhysicoChimiquesRepository;
import tn.jmal.productservice.Repository.CategorieRepository;
import tn.jmal.productservice.Repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CaracteristiquesPhysicoChimiquesRepository physicoChimiquesRepository;

    @Autowired
    private CaracteristiquesOrganoleptiquesRepository organoleptiquesRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            Product existingProduct = productOptional.get();
            updateProductDetails(existingProduct, productDetails);
            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }

    private void updateProductDetails(Product existingProduct, Product newProduct) {
        existingProduct.setNomProduit(newProduct.getNomProduit());
        existingProduct.setContenance(newProduct.getContenance());
        existingProduct.setNombreVariants(newProduct.getNombreVariants());
        existingProduct.setCategorie(newProduct.getCategorie());
        //existingProduct.setCaracteristiquesPhysicoChimiques(newProduct.getCaracteristiquesPhysicoChimiques());
        //existingProduct.setCaracteristiquesOrganoleptiques(newProduct.getCaracteristiquesOrganoleptiques());
    }
}
