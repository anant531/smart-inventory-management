package com.inventory.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.entities.Inward;
import com.inventory.repositories.InwardRepository;

@RestController
public class InwardController {

	InwardRepository inwardRepository;
	
	@GetMapping(path = "/inward")
	public List<Inward> getInwards(){
		return inwardRepository.findAll();
	}
	
	@PostMapping(path = "/inward")
	public void addInward(@RequestBody Inward i) {
		System.out.println(i);
		inwardRepository.save(i);
	}
}
