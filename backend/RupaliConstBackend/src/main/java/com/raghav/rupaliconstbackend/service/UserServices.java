package com.raghav.rupaliconstbackend.service;

import com.raghav.rupaliconstbackend.DTO.LoginDTO;
import com.raghav.rupaliconstbackend.DTO.RegisterDTO;
import com.raghav.rupaliconstbackend.Repositories.UserRepository;
import com.raghav.rupaliconstbackend.entity.Roles;
import com.raghav.rupaliconstbackend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServices {
    private  final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private  final UserRepository userRepo;


    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Transactional(rollbackFor = Exception.class,isolation = Isolation.REPEATABLE_READ)
    public User RegisterService(RegisterDTO dto){
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(encoder.encode(dto.getPassword()));
        user.setRoles("ADMIN");
        userRepo.save(user);
        return user;
    }

    public String verify(LoginDTO dto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getUsername(),
                        dto.getPassword()
                ));
        User user  = userRepo.findByUsername(dto.getUsername());
        return jwtService.genrateToken(user.getUsername(),user.getRoles());



    }
}
