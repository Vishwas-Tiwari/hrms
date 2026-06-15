package hrms.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * User entity for authentication. Links to Employee/Manager via OneToOne.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // EMPLOYEE, MANAGER, ADMIN

    private boolean enabled = true;

    @OneToOne(mappedBy = "user")
    private Employee employee;

    @OneToOne(mappedBy = "user")
    private Manager manager;
}
