package hrms.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * AssessmentStatus entity to store allowed statuses.
 */
@Entity
@Table(name = "assessment_statuses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, REJECTED, RETURNED
}
