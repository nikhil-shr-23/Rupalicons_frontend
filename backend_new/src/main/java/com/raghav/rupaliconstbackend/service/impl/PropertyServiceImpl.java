package com.raghav.rupaliconstbackend.service.impl;

import com.raghav.rupaliconstbackend.DTO.PropertyResponseDTO;
import com.raghav.rupaliconstbackend.Repositories.PropertyRepository;
import com.raghav.rupaliconstbackend.entity.Property;
import com.raghav.rupaliconstbackend.entity.PropertyStatus;
import com.raghav.rupaliconstbackend.entity.PropertyType;
import com.raghav.rupaliconstbackend.exception.ResourceNotFoundException;
import com.raghav.rupaliconstbackend.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PropertyServiceImpl implements PropertyService {
    private final PropertyRepository propertyRepository;

    @Override
    public Page<PropertyResponseDTO> getAvailableProperties(Pageable pageable, PropertyType type, BigDecimal minPrice,
                                                            BigDecimal maxPrice, BigDecimal minRent, BigDecimal maxRent,
                                                            String location) {
        Specification<Property> spec =
                (root, query, cb) -> cb.equal(root.get("status"), PropertyStatus.AVAILABLE);

        if (type != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("type"), type));
        }
        if (location != null && !location.isBlank()) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("location")),
                    "%" + location.toLowerCase() + "%"));
        }
        if (minPrice != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }
        if (minRent != null) {
            spec = spec.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("rentAmount"), minRent));
        }
        if (maxRent != null) {
            spec = spec.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("rentAmount"), maxRent));
        }

        return propertyRepository.findAll(spec, pageable).map(this::toDto);
    }

    @Override
    public PropertyResponseDTO getAvailableProperty(Long id) {
        Property property = propertyRepository.findByIdAndStatus(id, PropertyStatus.AVAILABLE)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        return toDto(property);
    }

    @Override
    public void reactToProperty(Long id) {
        Property property = propertyRepository.findByIdAndStatus(id, PropertyStatus.AVAILABLE)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));
        
        Integer current = property.getReactionsCount();
        if (current == null) current = 0;
        property.setReactionsCount(current + 1);
        propertyRepository.save(property);
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
        dto.setAgentName(property.getAgentName());
        dto.setAgentPhotoUrl(property.getAgentPhotoUrl());
        dto.setAmenities(property.getAmenities());
        dto.setReactionsCount(property.getReactionsCount());
        return dto;
    }
}
