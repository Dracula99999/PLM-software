package tn.jmal.userstock.Controller;
import tn.jmal.userstock.Entities.User;
import tn.jmal.userstock.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/Users")
    public List<User> Users(){
        return userRepository.findAll();
    }
    @GetMapping("/GetUser/{id}")
    public User findUser(@PathVariable Long id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }


    @PostMapping("/CreateUsers")
    public User CreateUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @PutMapping("/UpdateUser/{email}")
    public User updateUserByEmail(@PathVariable String email, @RequestBody User newUser) {
        User existingUser = userRepository.findByEmail(email);

        if (existingUser != null) {
            existingUser.setEmail(newUser.getEmail());
            existingUser.setPassword(newUser.getPassword());
            existingUser.setName(newUser.getName());
            existingUser.setPrenom(newUser.getPrenom());
            existingUser.setTelephone(newUser.getTelephone());
            existingUser.setAdresse(newUser.getAdresse());
            existingUser.setRole(newUser.getRole());
            // Ajoutez plus de champs si nécessaire

            // Sauvegardez l'entité utilisateur mise à jour dans la base de données
            return userRepository.save(existingUser);
        } else {
            // Gestion du cas où l'utilisateur n'est pas trouvé
            // Vous pouvez soit lancer une exception, soit retourner null ou une valeur par défaut
            // Ici, nous lançons une exception
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    @DeleteMapping("/DeleteUser/{id}")
    public void DeleteUser(@PathVariable Long id){
        userRepository.deleteById(id);
    }
    @GetMapping("/LoginUser/checkCredentials")
    public int loginUser(@RequestParam String email,@RequestParam String password) {
        System.out.println(email);
        // Find user by email
        User existingUser = userRepository.findByEmail(email);
        // Check if user with provided email exists
        if (existingUser == null) {
            return 1;
        }
        // Check if password matches
        if (!existingUser.getPassword().equals(password)) return 2;
        return 3;

        // Return the authenticated user

    }
    @GetMapping("LoginUserGetId")
    public Long idUser(@RequestParam String email,@RequestParam String password) {
        System.out.println(email);
        // Find user by email
        User existingUser = userRepository.findByEmail(email);
        // Check if user with provided email exists
        if (existingUser == null) {
            return 0L;
        }
        else{
            return existingUser.getId();
        }

        // Return the authenticated user

    }
    @PutMapping("/UpdateUserId/{id}")
    public User updateUserById(@PathVariable Long id, @RequestBody User newUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setEmail(newUser.getEmail());
                    existingUser.setPassword(newUser.getPassword());
                    existingUser.setName(newUser.getName());
                    existingUser.setPrenom(newUser.getPrenom());
                    existingUser.setTelephone(newUser.getTelephone());
                    existingUser.setAdresse(newUser.getAdresse());
                    existingUser.setRole(newUser.getRole());
                    // Add more fields if necessary
                    return userRepository.save(existingUser);
                }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
}

