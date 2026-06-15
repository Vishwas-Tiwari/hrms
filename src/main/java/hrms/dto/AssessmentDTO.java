package hrms.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentDTO {
    private Long id;

    @NotNull(message = "EmployeeId is required")
    private Long employeeId;

    private Long managerId;

    @NotNull(message = "Assessment year is required")
    private Integer assessmentYear;

    @Size(max = 5000)
    private String selfAssessment;

    @Size(max = 5000)
    private String keyAchievements;

    @Size(max = 5000)
    private String challenges;

    @Size(max = 5000)
    private String trainingUndertaken;

    @Size(max = 5000)
    private String goalsForNextYear;

    @Size(max = 2000)
    private String managerRemarks;

    private String status;
    private Instant createdAt;
    private Instant updatedAt;
}
