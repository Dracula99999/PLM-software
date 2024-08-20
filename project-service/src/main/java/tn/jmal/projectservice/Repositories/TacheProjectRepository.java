package tn.jmal.projectservice.Repositories;

import tn.jmal.projectservice.Entities.TacheProject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TacheProjectRepository extends JpaRepository<TacheProject, Long> {
}
