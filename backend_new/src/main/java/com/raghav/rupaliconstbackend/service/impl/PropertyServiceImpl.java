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

    private PropertyResponseDTO toDto(Property property) {
        return new PropertyResponseDTO(
                property.getId(),
                property.getTitle(),
                property.getDescription(),
                property.getPrice(),
                property.getRentAmount(),
                property.getLocation(),
                property.getSize(),
                property.getType(),
                property.getStatus(),
                property.getCreatedBy().getId(),
                property.getCreatedAt()
        );
    }
}
