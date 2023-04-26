package com.inventory.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.entities.GodownItem;
import com.inventory.entities.godown;
import com.inventory.repositories.GodownItemRepository;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.ItemsRepository;

@RestController
public class GodownController {

		@Autowired
		GodownRepository godownRepository;
		
		@Autowired
		ItemsRepository itemsRepository;
		
		@Autowired
		GodownItemRepository godownItemRepository;

		@GetMapping("/godown")
		public List<godown> getAllGodown() {
			return godownRepository.findAll();
		}

		@GetMapping("/godown/{id}")
		public Optional<godown> getGodownById(@PathVariable long id) {
	        return godownRepository.findById(id);
		}

		@PostMapping("/godown")
		public void addGodown(@RequestBody godown g) {
			System.out.println(g);
		}
		
		@PostMapping("/godownItem")
		public void allItems(@RequestBody GodownItem gi) {
			System.out.println(gi);
		}
		
		@GetMapping("/godownItem")
		public List<GodownItem> displayItems(){
			return godownItemRepository.findAll();
		}
//
//		@PostMapping("/godown/addProducts")
//		public void addProducts(@RequestBody godown g) {
//			System.out.println(g);
//			List<Items> items = new ArrayList<>();
//			Optional<godown> godownFound = godownRepository.findById(g.getGodownId());
//			if(godownFound.isPresent()) {
//				for(Items i : g.getItems()) {
//						Optional<Items> itemFound = itemsRepository.findById(i.getItemId());
//						items.add(itemFound.get());
//				}
//				g = godownFound.get();
//				g.setItems(items);
//				godownRepository.save(g);
//			}
//		}

}
