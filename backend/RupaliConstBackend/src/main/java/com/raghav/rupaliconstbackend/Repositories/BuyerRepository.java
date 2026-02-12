package com.raghav.rupaliconstbackend.Repositories;

import com.raghav.rupaliconstbackend.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuyerRepository extends JpaRepository<Buyer, Long> {
}
