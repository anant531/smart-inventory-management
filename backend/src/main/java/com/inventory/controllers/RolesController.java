package com.inventory.controllers;

import com.inventory.entities.Roles;
import com.inventory.repositories.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class RolesController {

	@Autowired
	RolesRepository rolesRepository;

	@GetMapping(path = "/roles")
	public List<Roles> getAllUser(){
		return rolesRepository.findAll();
	}

	@PostMapping(path = "/roles")
	public void addUser(@RequestBody Roles r) {
		rolesRepository.save(r);
	}
	
	@DeleteMapping(path = "/roles/{id}")
	public void deleteUser(@PathVariable long id) {
		Optional<Roles> roleFound = rolesRepository.findById(id);
		if(roleFound.isPresent()) {
			rolesRepository.delete(roleFound.get());
		}
	}
	
	@PutMapping(path = "/roles/{id}")
	public void updateUser(@RequestBody Roles r) {
		rolesRepository.save(r);
	}
	
}
