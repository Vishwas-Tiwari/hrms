package hrms.controller;

import hrms.dto.AssessmentDTO;
import hrms.repository.EmployeeRepository;
import hrms.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
// ===========================
// MANAGER REVIEW APIs
// Used by Reporting Officer
// ===========================
 */
@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final AssessmentService assessmentService;
    private final EmployeeRepository employeeRepository;

    @GetMapping("/employees/{managerId}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAssignedEmployees(@PathVariable Long managerId) {
        return ResponseEntity.ok(employeeRepository.findByManagerId(managerId));
    }

    @GetMapping("/assessments/pending/{managerId}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public List<AssessmentDTO> pending(@PathVariable Long managerId) {
        // For now return all assessments assigned to manager; status-based filtering added in Phase 4
        return assessmentService.listByManager(managerId);
    }

    @PostMapping("/assessments/{id}/approve")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<AssessmentDTO> approve(@PathVariable Long id, @RequestBody ManagerActionRequest req) {
        AssessmentDTO dto = assessmentService.changeStatus(id, "APPROVED", req.managerRemarks());
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/assessments/{id}/reject")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<AssessmentDTO> reject(@PathVariable Long id, @RequestBody ManagerActionRequest req) {
        AssessmentDTO dto = assessmentService.changeStatus(id, "REJECTED", req.managerRemarks());
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/assessments/{id}/return")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<AssessmentDTO> ret(@PathVariable Long id, @RequestBody ManagerActionRequest req) {
        AssessmentDTO dto = assessmentService.changeStatus(id, "RETURNED", req.managerRemarks());
        return ResponseEntity.ok(dto);
    }

    public static record ManagerActionRequest(String managerRemarks) {}
}
