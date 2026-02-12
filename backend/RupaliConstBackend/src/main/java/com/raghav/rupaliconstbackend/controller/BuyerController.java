package com.raghav.rupaliconstbackend.controller;

import com.raghav.rupaliconstbackend.entity.Buyer;
import com.raghav.rupaliconstbackend.service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/buyers")
public class BuyerController {
    private final BuyerService buyerService;

    @GetMapping
    public ResponseEntity<Page<Buyer>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size
    ) {
        return ResponseEntity.ok(buyerService.getAll(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Buyer> getById(@PathVariable Long id) {
        return ResponseEntity.ok(buyerService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Buyer> create(@RequestBody Buyer payload) {
        return new ResponseEntity<>(buyerService.create(payload), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Buyer> update(@PathVariable Long id, @RequestBody Buyer payload) {
        return ResponseEntity.ok(buyerService.update(id, payload));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Buyer> patch(@PathVariable Long id, @RequestBody Buyer payload) {
        return ResponseEntity.ok(buyerService.patch(id, payload));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        buyerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
