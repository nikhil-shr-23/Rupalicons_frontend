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
public class Buyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyerId;

    @Column(nullable = false)
    private String leadSource;

    @Column(nullable = false)
    private String dataAging;

    private String clientName;

    @Column(nullable = false)
    private String clientNumber;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DataSource dataSource;

    private String clientLocation;

    private String clientBudget;

    private String leadRemarks;

    private String propertyType;

    private String callingNotes;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    private void onCreate() {
        Instant now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    private void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
