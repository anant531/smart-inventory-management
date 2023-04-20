package com.inventory.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entities.Employee;

public interface UserRepository extends JpaRepository<Employee, Long>{
	Optional<Employee> findByUserName(String userName);

}
