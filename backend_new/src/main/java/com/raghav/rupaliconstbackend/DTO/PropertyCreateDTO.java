package com.raghav.rupaliconstbackend.DTO;

import com.raghav.rupaliconstbackend.entity.PropertyType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PropertyCreateDTO {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @PositiveOrZero
    private BigDecimal price;

    @PositiveOrZero
    private BigDecimal rentAmount;

    @NotBlank
    private String location;

    private String size;

    @NotNull
    private PropertyType type;
}
