package com.inventory.repositories;

import com.inventory.entities.Returns;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnsRepository extends JpaRepository<Returns, Long> {
}
