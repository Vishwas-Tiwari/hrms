package hrms.controller;

import hrms.dto.EmployeeDTO;
import hrms.entity.Manager;
import hrms.repository.ManagerRepository;
import hrms.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
// ===========================
// ADMIN MANAGEMENT APIs
// Used by System Administrator
// ===========================
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final EmployeeService employeeService;
    private final ManagerRepository managerRepository;

    @GetMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public List<EmployeeDTO> listEmployees() {
        return employeeService.listAll();
    }

    @PostMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EmployeeDTO> createEmployee(@Valid @RequestBody EmployeeDTO dto) {
        return ResponseEntity.ok(employeeService.create(dto));
    }

    @GetMapping("/managers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Manager> listManagers() {
        return managerRepository.findAll();
    }
}
