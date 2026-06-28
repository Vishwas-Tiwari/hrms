package hrms.controller;

import hrms.dto.AuthResponse;
import hrms.dto.LoginRequest;
import hrms.dto.RegisterRequest;
import hrms.entity.User;
import hrms.repository.UserRepository;
import hrms.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        // Check if username is already taken
        if (userRepository.existsByUsername(req.username())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Username is already taken"));
        }

        // Create and save the new user
        User user = User.builder()
                .name(req.name())
                .username(req.username())
                .password(passwordEncoder.encode(req.password()))
                .position(req.position() == null ? "EMPLOYEE" : req.position().toUpperCase())
                .build();

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Registration successful. Please log in."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        // Find user by username
        User user = userRepository.findByUsername(req.username()).orElse(null);

        // Verify user and password
        if (user == null || !passwordEncoder.matches(req.password(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Invalid username or password"));
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername(), user.getPosition());
        
        // Return full authentication details for the React frontend
        return ResponseEntity.ok(new AuthResponse(
                token,
                user.getName(),
                user.getUsername(),
                user.getPosition()
        ));
    }
}