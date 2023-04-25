package com.inventory.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entities.godown;

public interface GodownRepository extends JpaRepository<godown, Long>{
	
}
