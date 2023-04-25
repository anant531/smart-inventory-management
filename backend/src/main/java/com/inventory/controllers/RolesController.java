package com.inventory.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
}
