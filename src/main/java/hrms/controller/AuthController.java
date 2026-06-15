package hrms.controller;

import hrms.dto.UserDTO;
import hrms.service.AuthService;
import hrms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
// ===========================
// AUTHENTICATION APIs
// Used for login and token issuance (JWT)
// ===========================
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        hrms.dto.AuthResponse auth = authService.login(req.username(), req.password());
        return ResponseEntity.ok(auth);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest req) {
        UserDTO u = authService.register(req.username(), req.password(), req.role());
        return ResponseEntity.ok(u);
    }

    public static record LoginRequest(String username, String password) {}
    public static record RegisterRequest(String username, String password, String role) {}
    public static record AuthResponse(String token) {}
}
