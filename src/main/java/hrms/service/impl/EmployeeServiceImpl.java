package hrms.service.impl;

import hrms.dto.EmployeeDTO;
import hrms.entity.Employee;
import hrms.repository.EmployeeRepository;
import hrms.repository.DepartmentRepository;
import hrms.repository.ManagerRepository;
import hrms.service.EmployeeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final ManagerRepository managerRepository;

    private EmployeeDTO toDto(Employee e) {
        if (e == null) return null;
        return new EmployeeDTO(e.getId(), e.getEmployeeCode(), e.getName(), e.getDesignation(),
                e.getDepartment() == null ? null : e.getDepartment().getId(),
                e.getManager() == null ? null : e.getManager().getId());
    }

    @Override
    public EmployeeDTO create(EmployeeDTO dto) {
        Employee e = Employee.builder()
                .employeeCode(dto.getEmployeeCode())
                .name(dto.getName())
                .designation(dto.getDesignation())
                .build();
        if (dto.getDepartmentId() != null) {
            departmentRepository.findById(dto.getDepartmentId()).ifPresent(e::setDepartment);
        }
        if (dto.getManagerId() != null) {
            managerRepository.findById(dto.getManagerId()).ifPresent(e::setManager);
        }
        Employee saved = employeeRepository.save(e);
        return toDto(saved);
    }

    @Override
    public EmployeeDTO update(Long id, EmployeeDTO dto) {
        Employee e = employeeRepository.findById(id).orElseThrow();
        e.setName(dto.getName());
        e.setDesignation(dto.getDesignation());
        if (dto.getDepartmentId() != null) departmentRepository.findById(dto.getDepartmentId()).ifPresent(e::setDepartment);
        if (dto.getManagerId() != null) managerRepository.findById(dto.getManagerId()).ifPresent(e::setManager);
        return toDto(employeeRepository.save(e));
    }

    @Override
    public EmployeeDTO getById(Long id) {
        return toDto(employeeRepository.findById(id).orElse(null));
    }

    @Override
    public List<EmployeeDTO> listAll() {
        return employeeRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }
}
