package com.inventory.repositories;

import com.inventory.linktables.InwardItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InwardItemRepository extends JpaRepository<InwardItem, Long> {
}
