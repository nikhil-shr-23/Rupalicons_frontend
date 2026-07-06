package com.raghav.rupaliconstbackend.controller;

import com.raghav.rupaliconstbackend.DTO.NormalUserAuthResponseDTO;
import com.raghav.rupaliconstbackend.DTO.NormalUserLoginDTO;
import com.raghav.rupaliconstbackend.DTO.NormalUserRegisterDTO;
import com.raghav.rupaliconstbackend.DTO.NormalUserResponseDTO;
import com.raghav.rupaliconstbackend.DTO.NormalUserUpdateDTO;
import com.raghav.rupaliconstbackend.service.NormalUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Public-visitor account API. Secured by {@code NormalUserSecurityConfig}:
 * register/login are open, /me requires a NORMAL_USER token. The authenticated
 * principal name is the user's email (set by {@code NormalUserJwtFilter}).
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/normal-user")
public class NormalUserController {
    private final NormalUserService normalUserService;

    @PostMapping("/register")
    public ResponseEntity<NormalUserAuthResponseDTO> register(@Valid @RequestBody NormalUserRegisterDTO dto) {
        return new ResponseEntity<>(normalUserService.register(dto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<NormalUserAuthResponseDTO> login(@Valid @RequestBody NormalUserLoginDTO dto) {
        return ResponseEntity.ok(normalUserService.login(dto));
    }

    @GetMapping("/me")
    public ResponseEntity<NormalUserResponseDTO> me(Authentication authentication) {
        return ResponseEntity.ok(normalUserService.getByEmail(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<NormalUserResponseDTO> updateMe(Authentication authentication,
                                                          @Valid @RequestBody NormalUserUpdateDTO dto) {
        return ResponseEntity.ok(normalUserService.updateProfile(authentication.getName(), dto));
    }
}
