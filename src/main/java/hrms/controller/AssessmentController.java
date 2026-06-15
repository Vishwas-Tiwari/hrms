package hrms.controller;

import hrms.dto.AssessmentDTO;
import hrms.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
// ===========================
// EMPLOYEE APIs
// Used by Employee Portal (Assessment submission & history)
// ===========================
 */
@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<AssessmentDTO> create(@Valid @RequestBody AssessmentDTO dto) {
        AssessmentDTO created = assessmentService.create(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('ADMIN')")
    public ResponseEntity<AssessmentDTO> update(@PathVariable Long id, @Valid @RequestBody AssessmentDTO dto) {
        AssessmentDTO updated = assessmentService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','MANAGER','ADMIN')")
    public List<AssessmentDTO> byEmployee(@PathVariable Long employeeId) {
        return assessmentService.listByEmployee(employeeId);
    }

    @GetMapping("/manager/{managerId}")
    @PreAuthorize("hasAnyRole('MANAGER','ADMIN')")
    public List<AssessmentDTO> byManager(@PathVariable Long managerId) {
        return assessmentService.listByManager(managerId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentDTO> get(@PathVariable Long id) {
        AssessmentDTO dto = assessmentService.getById(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }
}
