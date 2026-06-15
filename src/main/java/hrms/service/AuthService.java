package hrms.service;

import hrms.dto.AuthResponse;
import hrms.dto.UserDTO;

public interface AuthService {
    AuthResponse login(String username, String password);
    UserDTO register(String username, String password, String role);
}
