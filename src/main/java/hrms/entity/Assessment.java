package hrms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Assessment entity holding self-assessments and manager reviews.
 */
@Entity
@Table(name = "assessments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Manager manager;

    private Integer assessmentYear;

    @Column(columnDefinition = "text")
    private String selfAssessment;

    @Column(columnDefinition = "text")
    private String keyAchievements;

    @Column(columnDefinition = "text")
    private String challenges;

    @Column(columnDefinition = "text")
    private String trainingUndertaken;

    @Column(columnDefinition = "text")
    private String goalsForNextYear;

    @Column(columnDefinition = "text")
    private String managerRemarks;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private AssessmentStatus status;

    private Instant createdAt;

    private Instant updatedAt;
}
