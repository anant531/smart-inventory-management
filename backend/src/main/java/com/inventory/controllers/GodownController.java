package com.inventory.controllers;

import com.inventory.embeddable.GodownItemId;
import com.inventory.entities.Godown;
import com.inventory.entities.GodownItem;
import com.inventory.entities.Items;
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
			System.out.println(g);
		}

		public double calcualteCapacity(Godown godown){
			double totalWeight = godown.getGodownItems().stream()
					.mapToDouble(gi -> gi.getQuantity() * gi.getItem().getWeight()).sum();

			return ((double) Math.round(totalWeight) / 100);
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
				        Optional<GodownItem> godownItemFound = godownItemRepository.findById(godownItemId);
				        if(godownItemFound.isPresent()) {
				        	GodownItem existingGodownItem = godownItemFound.get();
				        	existingGodownItem.setQuantity(godownItem.getQuantity() + existingGodownItem.getQuantity());

							if(calcualteCapacity(godown) <= godown.getGodownCapacity()) {
								godownItemRepository.save(existingGodownItem);
							}
				        }
				        else {
				        	godownItem.setId(godownItemId);
					        godownItem.setGodown(godown);
					        godownItem.setItem(item);
					        godown.getGodownItems().add(godownItem);
						}
			        }
			    }

				if(calcualteCapacity(godown)  <= godown.getGodownCapacity()){
					godownRepository.save(godown);
				}

				else{
					System.out.println("EZ");
				}
			}
				
		}

}
