package com.raghav.rupaliconstbackend.Repositories;

import com.raghav.rupaliconstbackend.entity.properties;
import com.raghav.rupaliconstbackend.entity.DealType;
import com.raghav.rupaliconstbackend.entity.ProjectStage;
import com.raghav.rupaliconstbackend.entity.ProjectType;
import com.raghav.rupaliconstbackend.entity.UnitType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertiesRepository extends JpaRepository<properties, Long> {
    List<properties> findByDealType(DealType dealType);
    List<properties> findByProjectStage(ProjectStage projectStage);
    List<properties> findByProjectType(ProjectType projectType);
    List<properties> findByUnitType(UnitType unitType);
}
