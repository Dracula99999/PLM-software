package tn.jmal.projectservice.Repositories;

import tn.jmal.projectservice.Entities.Tache;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TacheRepository extends JpaRepository<Tache, Long> {
}
