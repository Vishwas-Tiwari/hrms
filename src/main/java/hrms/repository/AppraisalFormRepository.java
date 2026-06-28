package hrms.repository;

import hrms.entity.AppraisalForm;
import hrms.entity.AppraisalStatus;
import hrms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppraisalFormRepository extends JpaRepository<AppraisalForm, Long> {
    List<AppraisalForm> findByUserOrderByUpdatedAtDesc(User user);
    List<AppraisalForm> findByStatusOrderBySubmittedAtDesc(AppraisalStatus status);
}
