package com.raghav.rupaliconstbackend.controller;

import com.raghav.rupaliconstbackend.DTO.LoginDTO;
import com.raghav.rupaliconstbackend.DTO.RegisterDTO;
import com.raghav.rupaliconstbackend.entity.User;
import com.raghav.rupaliconstbackend.service.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {
    private final UserServices userService;

    @PostMapping("/register")
    public ResponseEntity<User> Register(@RequestBody RegisterDTO registerDTO) {
        return new ResponseEntity<>(userService.RegisterService(registerDTO), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        return new ResponseEntity<>(userService.verify(loginDTO),HttpStatus.OK);
    }
}
