package com.raghav.rupaliconstbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String phone;

    private String email;

    private String location;

    @Column(length = 2000)
    private String message;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @PrePersist
    private void onCreate() {
        this.createdAt = Instant.now();
    }
}
