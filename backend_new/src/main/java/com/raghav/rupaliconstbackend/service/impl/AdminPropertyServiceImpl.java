package com.raghav.rupaliconstbackend.service.impl;

import com.raghav.rupaliconstbackend.DTO.PropertyCreateDTO;
import com.raghav.rupaliconstbackend.DTO.PropertyResponseDTO;
import com.raghav.rupaliconstbackend.DTO.PropertyUpdateDTO;
import com.raghav.rupaliconstbackend.DTO.PurchaseRequestDTO;
import com.raghav.rupaliconstbackend.DTO.PurchaseResponseDTO;
import com.raghav.rupaliconstbackend.DTO.RentalRequestDTO;
import com.raghav.rupaliconstbackend.DTO.RentalResponseDTO;
import com.raghav.rupaliconstbackend.Repositories.PropertyRepository;
import com.raghav.rupaliconstbackend.Repositories.PurchaseRepository;
import com.raghav.rupaliconstbackend.Repositories.RentalRepository;
import com.raghav.rupaliconstbackend.Repositories.UserRepository;
import com.raghav.rupaliconstbackend.entity.Property;
import com.raghav.rupaliconstbackend.entity.PropertyStatus;
import com.raghav.rupaliconstbackend.entity.PropertyType;
import com.raghav.rupaliconstbackend.entity.Purchase;
import com.raghav.rupaliconstbackend.entity.Rental;
import com.raghav.rupaliconstbackend.entity.User;
import com.raghav.rupaliconstbackend.exception.BadRequestException;
import com.raghav.rupaliconstbackend.exception.ResourceNotFoundException;
import com.raghav.rupaliconstbackend.service.AdminPropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminPropertyServiceImpl implements AdminPropertyService {
    private final PropertyRepository propertyRepository;
    private final PurchaseRepository purchaseRepository;
    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;

    @Override
    public PropertyResponseDTO createProperty(PropertyCreateDTO dto, String adminEmail) {
        User admin = getAdmin(adminEmail);
        validateTypeAmounts(dto.getType(), dto.getPrice(), dto.getRentAmount());

        Property property = new Property();
        property.setTitle(dto.getTitle());
        property.setDescription(dto.getDescription());
        property.setPrice(dto.getPrice());
        property.setRentAmount(dto.getRentAmount());
        property.setLocation(dto.getLocation());
        property.setSize(dto.getSize());
        property.setType(dto.getType());
        property.setStatus(PropertyStatus.AVAILABLE);
        property.setCreatedBy(admin);
        // Media
        property.setImageUrl(dto.getImageUrl());
        property.setBrochureUrl(dto.getBrochureUrl());
        // Room details
        property.setBedrooms(dto.getBedrooms());
        property.setBathrooms(dto.getBathrooms());
        property.setSqft(dto.getSqft());
        property.setFeatured(dto.isFeatured());
        // Extended fields
        property.setBuildingType(dto.getBuildingType());
        property.setPropertyCategory(dto.getPropertyCategory());
        property.setCity(dto.getCity());
        property.setMicroMarket(dto.getMicroMarket());
        property.setLocality(dto.getLocality());
        property.setFlooring(dto.getFlooring());
        property.setFloorNumber(dto.getFloorNumber());
        property.setTotalFloors(dto.getTotalFloors());
        property.setUnitNumber(dto.getUnitNumber());
        property.setAvailableFrom(dto.getAvailableFrom());
        property.setTags(dto.getTags());
        property.setFurnishingDetails(dto.getFurnishingDetails());
        property.setFurnishingStatus(dto.getFurnishingStatus());

        return toDto(propertyRepository.save(property));
    }

    @Override
    public PropertyResponseDTO updateProperty(Long id, PropertyUpdateDTO dto) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        validateTypeAmounts(dto.getType(), dto.getPrice(), dto.getRentAmount());
        property.setTitle(dto.getTitle());
        property.setDescription(dto.getDescription());
        property.setPrice(dto.getPrice());
        property.setRentAmount(dto.getRentAmount());
        property.setLocation(dto.getLocation());
        property.setSize(dto.getSize());
        property.setType(dto.getType());
        property.setStatus(dto.getStatus());
        // Media
        property.setImageUrl(dto.getImageUrl());
        property.setBrochureUrl(dto.getBrochureUrl());
        // Room details
        property.setBedrooms(dto.getBedrooms());
        property.setBathrooms(dto.getBathrooms());
        property.setSqft(dto.getSqft());
        property.setFeatured(dto.isFeatured());
        // Extended fields
        property.setBuildingType(dto.getBuildingType());
        property.setPropertyCategory(dto.getPropertyCategory());
        property.setCity(dto.getCity());
        property.setMicroMarket(dto.getMicroMarket());
        property.setLocality(dto.getLocality());
        property.setFlooring(dto.getFlooring());
        property.setFloorNumber(dto.getFloorNumber());
        property.setTotalFloors(dto.getTotalFloors());
        property.setUnitNumber(dto.getUnitNumber());
        property.setAvailableFrom(dto.getAvailableFrom());
        property.setTags(dto.getTags());
        property.setFurnishingDetails(dto.getFurnishingDetails());
        property.setFurnishingStatus(dto.getFurnishingStatus());

        return toDto(propertyRepository.save(property));
    }

    @Override
    public void deleteProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Property not found");
        }
        propertyRepository.deleteById(id);
    }

    @Override
    public PurchaseResponseDTO purchaseProperty(Long id, PurchaseRequestDTO dto, String adminEmail) {
        User admin = getAdmin(adminEmail);
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        if (property.getType() != PropertyType.SALE) {
            throw new BadRequestException("Only SALE properties can be purchased");
        }
        if (property.getStatus() != PropertyStatus.AVAILABLE) {
            throw new BadRequestException("Property is not available for sale");
        }
        property.setStatus(PropertyStatus.SOLD);
        propertyRepository.save(property);

        Purchase purchase = new Purchase();
        purchase.setProperty(property);
        purchase.setBuyerName(dto.getBuyerName());
        purchase.setBuyerPhone(dto.getBuyerPhone());
        purchase.setPurchasePrice(dto.getPurchasePrice());
        purchase.setPurchaseDate(LocalDateTime.now());
        purchase.setHandledBy(admin);
        Purchase saved = purchaseRepository.save(purchase);

        return new PurchaseResponseDTO(
                saved.getId(),
                saved.getProperty().getId(),
                saved.getBuyerName(),
                saved.getBuyerPhone(),
                saved.getPurchasePrice(),
                saved.getPurchaseDate()
        );
    }

    @Override
    public RentalResponseDTO rentProperty(Long id, RentalRequestDTO dto, String adminEmail) {
        User admin = getAdmin(adminEmail);
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        if (property.getType() != PropertyType.RENT) {
            throw new BadRequestException("Only RENT properties can be rented");
        }
        if (property.getStatus() != PropertyStatus.AVAILABLE) {
            throw new BadRequestException("Property is not available for rent");
        }
        property.setStatus(PropertyStatus.RENTED);
        propertyRepository.save(property);

        Rental rental = new Rental();
        rental.setProperty(property);
        rental.setTenantName(dto.getTenantName());
        rental.setTenantPhone(dto.getTenantPhone());
        rental.setMonthlyRent(dto.getMonthlyRent());
        rental.setStartDate(dto.getStartDate());
        rental.setEndDate(dto.getEndDate());
        rental.setHandledBy(admin);
        Rental saved = rentalRepository.save(rental);

        return new RentalResponseDTO(
                saved.getId(),
                saved.getProperty().getId(),
                saved.getTenantName(),
                saved.getTenantPhone(),
                saved.getMonthlyRent(),
                saved.getStartDate(),
                saved.getEndDate()
        );
    }

    private User getAdmin(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));
    }

    private void validateTypeAmounts(PropertyType type, java.math.BigDecimal price, java.math.BigDecimal rentAmount) {
        if (type == PropertyType.SALE && (price == null)) {
            throw new BadRequestException("Price is required for SALE properties");
        }
        if (type == PropertyType.RENT && (rentAmount == null)) {
            throw new BadRequestException("Rent amount is required for RENT properties");
        }
    }

    private PropertyResponseDTO toDto(Property property) {
        PropertyResponseDTO dto = new PropertyResponseDTO();
        dto.setId(property.getId());
        dto.setTitle(property.getTitle());
        dto.setDescription(property.getDescription());
        dto.setPrice(property.getPrice());
        dto.setRentAmount(property.getRentAmount());
        dto.setLocation(property.getLocation());
        dto.setSize(property.getSize());
        dto.setType(property.getType());
        dto.setStatus(property.getStatus());
        dto.setCreatedBy(property.getCreatedBy().getId());
        dto.setCreatedAt(property.getCreatedAt());
        dto.setImageUrl(property.getImageUrl());
        dto.setBrochureUrl(property.getBrochureUrl());
        dto.setBedrooms(property.getBedrooms());
        dto.setBathrooms(property.getBathrooms());
        dto.setSqft(property.getSqft());
        dto.setFeatured(property.isFeatured());
        dto.setBuildingType(property.getBuildingType());
        dto.setPropertyCategory(property.getPropertyCategory());
        dto.setCity(property.getCity());
        dto.setMicroMarket(property.getMicroMarket());
        dto.setLocality(property.getLocality());
        dto.setFlooring(property.getFlooring());
        dto.setFloorNumber(property.getFloorNumber());
        dto.setTotalFloors(property.getTotalFloors());
        dto.setUnitNumber(property.getUnitNumber());
        dto.setAvailableFrom(property.getAvailableFrom());
        dto.setTags(property.getTags());
        dto.setFurnishingDetails(property.getFurnishingDetails());
        dto.setFurnishingStatus(property.getFurnishingStatus());
        return dto;
    }
}
