package com.raghav.rupaliconstbackend.Repositories;

import com.raghav.rupaliconstbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
