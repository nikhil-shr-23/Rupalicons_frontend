package com.raghav.rupaliconstbackend.controller;

import com.raghav.rupaliconstbackend.DTO.PropertyCreateDTO;
import com.raghav.rupaliconstbackend.DTO.PropertyResponseDTO;
import com.raghav.rupaliconstbackend.DTO.PropertyUpdateDTO;
import com.raghav.rupaliconstbackend.DTO.PurchaseRequestDTO;
import com.raghav.rupaliconstbackend.DTO.PurchaseResponseDTO;
import com.raghav.rupaliconstbackend.DTO.RentalRequestDTO;
import com.raghav.rupaliconstbackend.DTO.RentalResponseDTO;
import com.raghav.rupaliconstbackend.service.AdminPropertyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/properties")
public class AdminPropertyController {
    private final AdminPropertyService adminPropertyService;

    @PostMapping
    public ResponseEntity<PropertyResponseDTO> createProperty(
            @Valid @RequestBody PropertyCreateDTO dto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return new ResponseEntity<>(
                adminPropertyService.createProperty(dto, userDetails.getUsername()),
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<PropertyResponseDTO> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyUpdateDTO dto
    ) {
        return ResponseEntity.ok(adminPropertyService.updateProperty(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        adminPropertyService.deleteProperty(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<PurchaseResponseDTO> purchaseProperty(
            @PathVariable Long id,
            @Valid @RequestBody PurchaseRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(adminPropertyService.purchaseProperty(id, dto, userDetails.getUsername()));
    }

    @PostMapping("/{id}/rent")
    public ResponseEntity<RentalResponseDTO> rentProperty(
            @PathVariable Long id,
            @Valid @RequestBody RentalRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(adminPropertyService.rentProperty(id, dto, userDetails.getUsername()));
    }
}
