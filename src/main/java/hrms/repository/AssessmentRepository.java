package hrms.repository;

import hrms.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByEmployeeId(Long employeeId);
    List<Assessment> findByManagerId(Long managerId);
}
