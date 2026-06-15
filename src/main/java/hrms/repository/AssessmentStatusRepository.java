package hrms.repository;

import hrms.entity.AssessmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssessmentStatusRepository extends JpaRepository<AssessmentStatus, Long> {
    Optional<AssessmentStatus> findByName(String name);
}
