package com.inventory.repositories;

import com.inventory.entities.Inward;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InwardRepository extends JpaRepository<Inward, Long>{
}
