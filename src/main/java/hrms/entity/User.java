package hrms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // Matches the actual database table name used by SQL migrations
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String position; // Stored in DB as the 'role' column

    @Column(nullable = false)
    @Builder.Default
    private boolean enabled = true;
}