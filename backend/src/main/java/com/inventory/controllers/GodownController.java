package com.inventory.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.entities.godown;
import com.inventory.repositories.GodownRepository;

@RestController
public class GodownController {

		@Autowired
		GodownRepository godownRepository;

		@GetMapping("/godown")
		public List<godown> getAllGodown() {
			return godownRepository.findAll();
		}

		@GetMapping("/godown/{id}")
		public godown getGodownById(Long godownId) {
	        return godownRepository.findById(godownId).orElse(null);
		}

		@PostMapping("/godown")
		public void addGodown(@RequestBody godown g) {
			godownRepository.save(g);
		}


}
