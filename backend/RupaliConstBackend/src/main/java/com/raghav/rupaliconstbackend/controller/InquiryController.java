package com.raghav.rupaliconstbackend.controller;

import com.raghav.rupaliconstbackend.Repositories.InquiryRepository;
import com.raghav.rupaliconstbackend.entity.Inquiry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inquiries")
@CrossOrigin(origins = "http://localhost:3000")
public class InquiryController {

    @Autowired
    private InquiryRepository inquiryRepository;

    @GetMapping
    public List<Inquiry> getAllInquiries() {
        return inquiryRepository.findAll();
    }

    @PostMapping
    public Inquiry createInquiry(@RequestBody Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }

    @DeleteMapping("/{id}")
    public void deleteInquiry(@PathVariable Long id) {
        inquiryRepository.deleteById(id);
    }
}
