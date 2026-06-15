package hrms.service;

import hrms.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {
    EmployeeDTO create(EmployeeDTO dto);
    EmployeeDTO update(Long id, EmployeeDTO dto);
    EmployeeDTO getById(Long id);
    List<EmployeeDTO> listAll();
}
