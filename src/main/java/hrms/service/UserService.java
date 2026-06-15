package hrms.service;

import hrms.dto.UserDTO;

public interface UserService {
    UserDTO findByUsername(String username);
}
