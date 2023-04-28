package com.inventory.controllers;

import com.inventory.entities.Inward;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.InwardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InwardController {
	@Autowired
	InwardRepository inwardRepository;

	@Autowired
	GodownRepository godownRepository;

	@GetMapping(path = "/inward")
	public List<Inward> getInwards(){
		return inwardRepository.findAll();
	}

	@PostMapping(path = "/inward")
	public void addInward(@RequestBody Inward i) {
		inwardRepository.save(i);

//		List<Inward> =
//
//		Optional<Godown> godown = godownRepository.findById(i.getGodown().getGodownId());
//		godown.ifPresent(value -> godownRepository.save(value));

	}
}
