package com.raghav.rupaliconstbackend.service;

import com.raghav.rupaliconstbackend.Repositories.UserRepository;
import com.raghav.rupaliconstbackend.entity.User;
import com.raghav.rupaliconstbackend.entity.UserPrinciple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {
    @Autowired
    UserRepository repo;
    @Override
    public UserDetails loadUserByUsername(String username ) throws UsernameNotFoundException {
        User users = repo.findByUsername(username);
        if (users == null){
            throw new UsernameNotFoundException("User Not Found");

        }
        return new UserPrinciple(users);
    }
}

