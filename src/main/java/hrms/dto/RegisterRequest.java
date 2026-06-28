package hrms.dto;

public record RegisterRequest(
    String name,
    String username,
    String password,
    String position
) {}