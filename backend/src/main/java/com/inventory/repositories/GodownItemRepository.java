package com.inventory.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.embeddable.GodownItemId;
import com.inventory.linktables.GodownItem;

public interface GodownItemRepository extends JpaRepository<GodownItem, GodownItemId>{

}
