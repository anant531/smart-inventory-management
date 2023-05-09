package com.inventory.repositories;

import com.inventory.entities.Godown;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GodownRepository extends JpaRepository<Godown, Long>{

    List<Godown> findAllByGodownLocation(String godownLocation);
}
