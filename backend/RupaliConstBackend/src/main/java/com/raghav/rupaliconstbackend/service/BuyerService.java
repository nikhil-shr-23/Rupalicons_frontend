package com.raghav.rupaliconstbackend.service;

import com.raghav.rupaliconstbackend.Repositories.BuyerRepository;
import com.raghav.rupaliconstbackend.entity.Buyer;
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
public class BuyerService {
    private final BuyerRepository buyerRepository;

    public org.springframework.data.domain.Page<Buyer> getAll(org.springframework.data.domain.Pageable pageable) {
        return buyerRepository.findAll(pageable);
    }

    public Buyer getById(Long id) {
        return buyerRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Buyer not found"));
    }

    public Buyer create(Buyer payload) {
        payload.setBuyerId(null);
        return buyerRepository.save(payload);
    }

    public Buyer update(Long id, Buyer payload) {
        Buyer existing = getById(id);
        BeanUtils.copyProperties(payload, existing, "buyerId", "createdAt", "updatedAt");
        return buyerRepository.save(existing);
    }

    public Buyer patch(Long id, Buyer patch) {
        Buyer existing = getById(id);
        BeanUtils.copyProperties(patch, existing, getNullPropertyNames(patch, "buyerId"));
        return buyerRepository.save(existing);
    }

    public void delete(Long id) {
        if (!buyerRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Buyer not found");
        }
        buyerRepository.deleteById(id);
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
