package com.inventory.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entities.Inward;

public interface InwardRepository extends JpaRepository<Inward, Long>{

}
