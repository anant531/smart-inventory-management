package com.inventory.repositories;

import com.inventory.embeddable.OutwardItemId;
import com.inventory.linktables.OutwardItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutwardItemRepository extends JpaRepository<OutwardItem, OutwardItemId> {
}
