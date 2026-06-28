package hrms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "appraisal_rows")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppraisalRow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id", nullable = false)
    private AppraisalForm form;

    @Column(length = 2000)
    private String target;

    @Column(length = 2000)
    private String achievement;

    @Column(length = 2000)
    private String remarks;
}
