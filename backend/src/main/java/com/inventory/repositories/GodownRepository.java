package com.inventory.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.embeddable.GodownItemId;
import com.inventory.entities.Godown;

public interface GodownRepository extends JpaRepository<Godown, Long>{

//	Optional<Godown> findById(long id);
	
}
