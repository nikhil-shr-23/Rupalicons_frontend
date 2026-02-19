package com.raghav.rupaliconstbackend.DTO;

import com.raghav.rupaliconstbackend.entity.PropertyStatus;
import com.raghav.rupaliconstbackend.entity.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyResponseDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private BigDecimal rentAmount;
    private String location;
    private String size;
    private PropertyType type;
    private PropertyStatus status;
    private Long createdBy;
    private Instant createdAt;
}
