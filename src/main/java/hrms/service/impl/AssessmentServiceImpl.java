package hrms.service.impl;

import hrms.dto.AssessmentDTO;
import hrms.entity.Assessment;
import hrms.entity.AssessmentStatus;
import hrms.repository.AssessmentRepository;
import hrms.repository.AssessmentStatusRepository;
import hrms.repository.EmployeeRepository;
import hrms.repository.ManagerRepository;
import hrms.service.AssessmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AssessmentServiceImpl implements AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final EmployeeRepository employeeRepository;
    private final ManagerRepository managerRepository;
    private final AssessmentStatusRepository statusRepository;

    private AssessmentDTO toDto(Assessment a) {
        if (a == null) return null;
        return new AssessmentDTO(a.getId(), a.getEmployee() == null ? null : a.getEmployee().getId(),
                a.getManager() == null ? null : a.getManager().getId(), a.getAssessmentYear(), a.getSelfAssessment(),
                a.getKeyAchievements(), a.getChallenges(), a.getTrainingUndertaken(), a.getGoalsForNextYear(),
                a.getManagerRemarks(), a.getStatus() == null ? null : a.getStatus().getName(), a.getCreatedAt(), a.getUpdatedAt());
    }

    @Override
    public AssessmentDTO create(AssessmentDTO dto) {
        Assessment a = Assessment.builder().assessmentYear(dto.getAssessmentYear()).selfAssessment(dto.getSelfAssessment())
                .keyAchievements(dto.getKeyAchievements()).challenges(dto.getChallenges()).trainingUndertaken(dto.getTrainingUndertaken())
                .goalsForNextYear(dto.getGoalsForNextYear()).managerRemarks(dto.getManagerRemarks()).createdAt(Instant.now()).updatedAt(Instant.now()).build();
        if (dto.getEmployeeId() != null) employeeRepository.findById(dto.getEmployeeId()).ifPresent(a::setEmployee);
        if (dto.getManagerId() != null) managerRepository.findById(dto.getManagerId()).ifPresent(a::setManager);
        statusRepository.findByName("DRAFT").ifPresent(a::setStatus);
        Assessment saved = assessmentRepository.save(a);
        return toDto(saved);
    }

    @Override
    public AssessmentDTO update(Long id, AssessmentDTO dto) {
        Assessment a = assessmentRepository.findById(id).orElseThrow();
        a.setSelfAssessment(dto.getSelfAssessment());
        a.setKeyAchievements(dto.getKeyAchievements());
        a.setChallenges(dto.getChallenges());
        a.setTrainingUndertaken(dto.getTrainingUndertaken());
        a.setGoalsForNextYear(dto.getGoalsForNextYear());
        a.setManagerRemarks(dto.getManagerRemarks());
        a.setUpdatedAt(Instant.now());
        return toDto(assessmentRepository.save(a));
    }

    @Override
    public AssessmentDTO getById(Long id) {
        return toDto(assessmentRepository.findById(id).orElse(null));
    }

    @Override
    public List<AssessmentDTO> listByEmployee(Long employeeId) {
        return assessmentRepository.findByEmployeeId(employeeId).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AssessmentDTO> listByManager(Long managerId) {
        return assessmentRepository.findByManagerId(managerId).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public AssessmentDTO changeStatus(Long assessmentId, String statusName, String managerRemarks) {
        Assessment a = assessmentRepository.findById(assessmentId).orElseThrow();
        AssessmentStatus st = statusRepository.findByName(statusName).orElseThrow();
        a.setStatus(st);
        if (managerRemarks != null) a.setManagerRemarks(managerRemarks);
        a.setUpdatedAt(Instant.now());
        return toDto(assessmentRepository.save(a));
    }
}
