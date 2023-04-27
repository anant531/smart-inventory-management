package com.inventory.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entities.Roles;

public interface RolesRepository extends JpaRepository<Roles, Long>{

	Optional<Roles> findByName(String name);

}
