package com.raghav.rupaliconstbackend.controller;

import com.raghav.rupaliconstbackend.entity.properties;
import com.raghav.rupaliconstbackend.entity.DealType;
import com.raghav.rupaliconstbackend.entity.ProjectStage;
import com.raghav.rupaliconstbackend.entity.ProjectType;
import com.raghav.rupaliconstbackend.entity.UnitType;
import com.raghav.rupaliconstbackend.service.PropertiesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/properties")
public class PropertiesController {
    private final PropertiesService propertiesService;

    @GetMapping
    public ResponseEntity<Page<properties>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size
    ) {
        return ResponseEntity.ok(propertiesService.getAll(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<properties> getById(@PathVariable Long id) {
        return ResponseEntity.ok(propertiesService.getById(id));
    }

    @GetMapping("/by-deal-type/{value}")
    public ResponseEntity<List<properties>> getByDealType(@PathVariable DealType value) {
        return ResponseEntity.ok(propertiesService.getByDealType(value));
    }

    @GetMapping("/by-stage/{value}")
    public ResponseEntity<List<properties>> getByProjectStage(@PathVariable ProjectStage value) {
        return ResponseEntity.ok(propertiesService.getByProjectStage(value));
    }

    @GetMapping("/by-type/{value}")
    public ResponseEntity<List<properties>> getByProjectType(@PathVariable ProjectType value) {
        return ResponseEntity.ok(propertiesService.getByProjectType(value));
    }

    @GetMapping("/by-unit-type/{value}")
    public ResponseEntity<List<properties>> getByUnitType(@PathVariable UnitType value) {
        return ResponseEntity.ok(propertiesService.getByUnitType(value));
    }

    @PostMapping
    public ResponseEntity<properties> create(@RequestBody properties payload) {
        return new ResponseEntity<>(propertiesService.create(payload), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<properties> update(@PathVariable Long id, @RequestBody properties payload) {
        return ResponseEntity.ok(propertiesService.update(id, payload));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<properties> patch(@PathVariable Long id, @RequestBody properties payload) {
        return ResponseEntity.ok(propertiesService.patch(id, payload));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        propertiesService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
