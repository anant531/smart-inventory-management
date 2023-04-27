package com.inventory.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.embeddable.GodownItemId;
import com.inventory.entities.Godown;
import com.inventory.entities.GodownItem;
import com.inventory.entities.Items;
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
		public List<Godown> getAllGodown() {
			return godownRepository.findAll();
		}

		@GetMapping("/godown/{id}")
		public Optional<Godown> getGodownById(@PathVariable long id) {
	        return godownRepository.findById(id);
		}

		@PostMapping("/godown")
		public void addGodown(@RequestBody Godown g) {
			System.out.println(g);
		}


		@PostMapping("/godown/addProducts")
		public void addProducts(@RequestBody Godown g) {
			Optional<Godown> godownFound = godownRepository.findById(g.getGodownId());
			if(godownFound.isPresent()) {
				Godown godown = godownFound.get();
				for (GodownItem godownItem : g.getGodownItems()) {
			        Optional<Items> optionalItem = itemsRepository.findById(godownItem.getItem().getItemId());
			        if (optionalItem.isPresent()) {
			        	Items item = optionalItem.get();
				        GodownItemId godownItemId = new GodownItemId(g.getGodownId(), item.getItemId());
				        godownItem.setId(godownItemId);
				        godownItem.setGodown(godown);
				        godownItem.setItem(item);
				        System.out.println(godownItem);
				        godown.getGodownItems().add(godownItem);
			        }
			        
			    }
				
			    godownRepository.save(godown);

			}
				
		}

}
