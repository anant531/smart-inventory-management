package com.inventory.controllers;

import com.inventory.entities.Godown;
import com.inventory.repositories.GodownItemRepository;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class GodownController {

		@Autowired
		GodownRepository godownRepository;
		
		@Autowired
		ItemsRepository itemsRepository;
		
		@Autowired
		GodownItemRepository godownItemRepository;

		@GetMapping("/godown")
		public List<Godown> getAllGodown() {
			return godownRepository.findAll();
		}

		@GetMapping("/godown/{id}")
		public Optional<Godown> getGodownById(@PathVariable long id) {
	        return godownRepository.findById(id);
		}

		@PostMapping("/godown")
		public void addGodown(@RequestBody Godown g) {
			godownRepository.save(g);
		}

		@DeleteMapping("/godown/{id}")
		public void deleteGodown(@PathVariable long id){
			Optional<Godown> godownFound = godownRepository.findById(id);
			if(godownFound.isPresent()){
				godownRepository.delete(godownFound.get());
			}
		}

		@PutMapping(path = "/godown/{id}")
		public void updateGodown(@RequestBody Godown g){
			godownRepository.save(g);
		}

}
