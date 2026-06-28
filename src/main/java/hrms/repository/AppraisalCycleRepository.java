package hrms.repository;

import hrms.entity.AppraisalCycle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppraisalCycleRepository extends JpaRepository<AppraisalCycle, Long> {
    Optional<AppraisalCycle> findFirstByStatusOrderByStartDateDesc(String status);
}
