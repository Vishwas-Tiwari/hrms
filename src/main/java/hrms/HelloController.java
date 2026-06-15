package hrms;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private List<Employee> employees = new ArrayList<>();
    private List<Assessment> assessments = new ArrayList<>();
    public HelloController() {
        employees.add(new Employee(1, "Vishwas", "IT"));
        employees.add(new Employee(2, "Rahul", "HR"));
    }

    @GetMapping("/hello")
    public String hello() {
        return "Welcome Vishwas! Building NIC HRMS 🚀";
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return employees;
    }

    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee) {
        employees.add(employee);
        return employee;
    }
    @PostMapping("/assessments")
     public Assessment submitAssessment(@RequestBody Assessment assessment) {
    assessments.add(assessment);
    return assessment;
     }
     @GetMapping("/assessments")
    public List<Assessment> getAssessments() {
    return assessments;
}
}