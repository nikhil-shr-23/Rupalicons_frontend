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
public class properties {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long propertiesId;

    @Column(nullable = false)
    private String devName;

    @Column(nullable = false)
    private String projectName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProjectType projectType;

    private String launchTime;

    private String launchPrice;

    @Enumerated(EnumType.STRING)
    private UnitType unitType;

    @Enumerated(EnumType.STRING)
    private ProjectStage projectStage;

    private String location;

    @Enumerated(EnumType.STRING)
    private DealType dealType;

    private Long unitSize;

    private Long unitNumber;

    private Long FloorNumber;

    private   String OwnerName;

    private String OwnerAddress;

    private Long CurrentPrice;

    private Long AskingPrice;

    private String Notes;

    @Column(length = 2048)
    private String imageUrl;

    @Column(length = 2048)
    private String brochureUrl;

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
