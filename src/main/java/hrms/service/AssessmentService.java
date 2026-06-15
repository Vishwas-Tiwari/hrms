package hrms.service;

import hrms.dto.AssessmentDTO;

import java.util.List;

public interface AssessmentService {
    AssessmentDTO create(AssessmentDTO dto);
    AssessmentDTO update(Long id, AssessmentDTO dto);
    AssessmentDTO getById(Long id);
    List<AssessmentDTO> listByEmployee(Long employeeId);
    List<AssessmentDTO> listByManager(Long managerId);
    AssessmentDTO changeStatus(Long assessmentId, String statusName, String managerRemarks);
}
