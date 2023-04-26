package com.inventory.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.entities.Roles;
import com.inventory.repositories.RolesRepository;

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
	
	@PutMapping(path = "/roles")
	public void updateUser(@RequestBody Roles r) {
		Optional<Roles> roleFound = rolesRepository.findById(r.getId());
		if(roleFound.isPresent()) {
			r = roleFound.get();
			
			rolesRepository.save(r);
		}
	}
	
}
