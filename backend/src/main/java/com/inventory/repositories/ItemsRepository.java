package com.inventory.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entities.Items;

public interface ItemsRepository extends JpaRepository<Items, Long> {
}
