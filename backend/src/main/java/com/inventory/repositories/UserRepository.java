package com.inventory.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.entities.Employee;


public interface UserRepository extends JpaRepository<Employee, Long>{

}
