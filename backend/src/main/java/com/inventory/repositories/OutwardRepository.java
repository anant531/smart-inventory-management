package com.inventory.repositories;

import com.inventory.entities.Outward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutwardRepository extends JpaRepository<Outward, Long> {
}
