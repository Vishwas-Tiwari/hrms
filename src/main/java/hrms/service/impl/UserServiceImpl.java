package hrms.service.impl;

import hrms.dto.UserDTO;
import hrms.entity.User;
import hrms.repository.UserRepository;
import hrms.service.UserService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDTO findByUsername(String username) {
        User u = userRepository.findByUsername(username).orElse(null);
        if (u == null) return null;
        return new UserDTO(u.getId(), u.getUsername(), u.getRole());
    }
}
