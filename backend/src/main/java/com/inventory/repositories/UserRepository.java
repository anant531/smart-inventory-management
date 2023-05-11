package com.inventory.repositories;

import com.inventory.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Employee, Long>{
	Optional<Employee> findByName(String name);

}
