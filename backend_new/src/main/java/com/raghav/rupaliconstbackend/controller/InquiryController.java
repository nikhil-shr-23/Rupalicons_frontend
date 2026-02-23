package com.raghav.rupaliconstbackend.controller;

import com.raghav.rupaliconstbackend.entity.Inquiry;
import com.raghav.rupaliconstbackend.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/inquiries")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InquiryController {
    
    private final InquiryRepository inquiryRepository;

    @PostMapping
    public ResponseEntity<Inquiry> submitInquiry(@RequestBody Inquiry inquiry) {
        inquiry.setCreatedAt(LocalDateTime.now());
        if (inquiry.getStatus() == null || inquiry.getStatus().isEmpty()) {
            inquiry.setStatus("NEW");
        }
        Inquiry saved = inquiryRepository.save(inquiry);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    
    // Admin can fetch inquiries directly
    @GetMapping
    public ResponseEntity<List<Inquiry>> getAllInquiries() {
        return ResponseEntity.ok(inquiryRepository.findAll());
    }
}
