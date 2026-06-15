package hrms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private Long id;

    @NotBlank(message = "Employee code is required")
    @Size(max = 100)
    private String employeeCode;

    @NotBlank(message = "Name is required")
    private String name;

    private String designation;
    private Long departmentId;
    private Long managerId;
}
