package com.raghav.rupaliconstbackend.service;

import com.raghav.rupaliconstbackend.Repositories.PropertiesRepository;
import com.raghav.rupaliconstbackend.entity.DealType;
import com.raghav.rupaliconstbackend.entity.ProjectStage;
import com.raghav.rupaliconstbackend.entity.ProjectType;
import com.raghav.rupaliconstbackend.entity.UnitType;
import com.raghav.rupaliconstbackend.entity.properties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.beans.PropertyDescriptor;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class PropertiesService {
    private final PropertiesRepository propertiesRepository;

    public org.springframework.data.domain.Page<properties> getAll(org.springframework.data.domain.Pageable pageable) {
        return propertiesRepository.findAll(pageable);
    }

    public properties getById(Long id) {
        return propertiesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found"));
    }

    public java.util.List<properties> getByDealType(DealType dealType) {
        return propertiesRepository.findByDealType(dealType);
    }

    public java.util.List<properties> getByProjectStage(ProjectStage projectStage) {
        return propertiesRepository.findByProjectStage(projectStage);
    }

    public java.util.List<properties> getByProjectType(ProjectType projectType) {
        return propertiesRepository.findByProjectType(projectType);
    }

    public java.util.List<properties> getByUnitType(UnitType unitType) {
        return propertiesRepository.findByUnitType(unitType);
    }

    public properties create(properties payload) {
        payload.setPropertiesId(null);
        return propertiesRepository.save(payload);
    }

    public properties update(Long id, properties payload) {
        properties existing = getById(id);
        existing.setDevName(payload.getDevName());
        existing.setProjectName(payload.getProjectName());
        existing.setProjectType(payload.getProjectType());
        existing.setLaunchTime(payload.getLaunchTime());
        existing.setLaunchPrice(payload.getLaunchPrice());
        existing.setUnitType(payload.getUnitType());
        existing.setProjectStage(payload.getProjectStage());
        existing.setLocation(payload.getLocation());
        existing.setDealType(payload.getDealType());
        existing.setUnitSize(payload.getUnitSize());
        existing.setUnitNumber(payload.getUnitNumber());
        existing.setFloorNumber(payload.getFloorNumber());
        existing.setOwnerName(payload.getOwnerName());
        existing.setOwnerAddress(payload.getOwnerAddress());
        existing.setCurrentPrice(payload.getCurrentPrice());
        existing.setAskingPrice(payload.getAskingPrice());
        existing.setNotes(payload.getNotes());
        return propertiesRepository.save(existing);
    }

    public properties patch(Long id, properties patch) {
        properties existing = getById(id);
        BeanUtils.copyProperties(patch, existing, getNullPropertyNames(patch, "propertiesId"));
        return propertiesRepository.save(existing);
    }

    public void delete(Long id) {
        if (!propertiesRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Property not found");
        }
        propertiesRepository.deleteById(id);
    }

    private static String[] getNullPropertyNames(Object source, String... extraIgnore) {
        BeanWrapper wrappedSource = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = wrappedSource.getPropertyDescriptors();
        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            Object value = wrappedSource.getPropertyValue(pd.getName());
            if (value == null) {
                emptyNames.add(pd.getName());
            }
        }
        for (String ignore : extraIgnore) {
            emptyNames.add(ignore);
        }
        return emptyNames.toArray(new String[0]);
    }
}
