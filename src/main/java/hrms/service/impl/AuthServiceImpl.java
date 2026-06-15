package hrms.service.impl;

import hrms.dto.UserDTO;
import hrms.entity.User;
import hrms.repository.UserRepository;
import hrms.security.JwtUtil;
import hrms.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public hrms.dto.AuthResponse login(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        org.springframework.security.core.userdetails.UserDetails userDetails =
                customLoadUser(username);
        String token = jwtUtil.generateToken(userDetails);
        // load role from user repository
        String role = userRepository.findByUsername(username).map(u -> u.getRole()).orElse(null);
        return new hrms.dto.AuthResponse(token, role);
    }

    private org.springframework.security.core.userdetails.UserDetails customLoadUser(String username) {
        return (org.springframework.security.core.userdetails.UserDetails) userRepository.findByUsername(username)
                .map(u -> new org.springframework.security.core.userdetails.User(u.getUsername(), u.getPassword(), java.util.List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + u.getRole()))))
                .orElseThrow();
    }

    @Override
    public UserDTO register(String username, String password, String role) {
        if (userRepository.findByUsername(username).isPresent()) throw new RuntimeException("Username exists");
        User u = User.builder().username(username).password(passwordEncoder.encode(password)).role(role).enabled(true).build();
        User saved = userRepository.save(u);
        return new UserDTO(saved.getId(), saved.getUsername(), saved.getRole());
    }
}
