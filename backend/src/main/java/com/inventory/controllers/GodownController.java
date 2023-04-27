package com.inventory.controllers;

import java.util.List;
import java.util.Optional;
import java.util.HashSet;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

//		@PostMapping("/godown/addProducts")
//		public ResponseEntity<String> addProducts(@RequestBody Godown g) {
//		    Optional<Godown> godownFound = godownRepository.findById(g.getGodownId());
//		    if (godownFound.isPresent()) {
//		        Godown godown = godownFound.get();
//
//		        double totalWeight = godown.getGodownItems().stream()
//		                .mapToDouble(gi -> gi.getQuantity() * gi.getItem().getWeight()).sum();
////		        double existingCapacity = totalWeight / 100.0; 
//		        double newTotalWeight = g.getGodownItems().stream()
//		                .mapToDouble(gi -> gi.getQuantity() * gi.getItem().getWeight())
//		                .sum();
//		        
//		        double newCapacity = (totalWeight + newTotalWeight) / 100.0; // convert to quintals
//
//		        if (newCapacity > godown.getGodownCapacity()) {
//		            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//		                    .body("Adding the new items will exceed the godown capacity.");
//		        }
//
//		        for (GodownItem godownItem : g.getGodownItems()) {
//		            Optional<Items> optionalItem = itemsRepository.findById(godownItem.getItem().getItemId());
//		            if (optionalItem.isPresent()) {
//		                Items item = optionalItem.get();
//		                GodownItemId godownItemId = new GodownItemId(g.getGodownId(), item.getItemId());
//		                Optional<GodownItem> optionalGodownItem = godownItemRepository.findById(godownItemId);
//		                if (optionalGodownItem.isPresent()) {
//		                    GodownItem existingGodownItem = optionalGodownItem.get();
//		                    existingGodownItem.setQuantity(existingGodownItem.getQuantity() + godownItem.getQuantity());
//		                    godownItemRepository.save(existingGodownItem);
//		                } else {
//		                    GodownItem newGodownItem = new GodownItem();
//		                    newGodownItem.setId(godownItemId);
//		                    newGodownItem.setGodown(godown);
//		                    newGodownItem.setItem(item);
//		                    newGodownItem.setQuantity(godownItem.getQuantity());
//		                    if (godown.getGodownItems() == null) {
//		                        godown.setGodownItems(new HashSet<>());
//		                    }
//		                    godown.getGodownItems().add(newGodownItem);
//		                    godownItemRepository.save(newGodownItem);
//		                }
//		            }
//		        }
//
//		        godown.setGodownCapacity((int) Math.round(newCapacity));
//		        godownRepository.save(godown);
//		        return ResponseEntity.ok().build();
//		    }
//
//		    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Godown not found");
//		}


//		@PostMapping("/godown")
//		public void addGodown(@RequestBody Godown g) {
//			System.out.println(g);
//		}
//
//		
//		@PostMapping("/godown/addProducts")
//		public ResponseEntity<String> addProducts(@RequestBody Godown g) {
//		    Optional<Godown> godownFound = godownRepository.findById(g.getGodownId());
//		    if (godownFound.isPresent()) {
//		        Godown godown = godownFound.get();
//
//		        double totalWeight = godown.getGodownItems().stream()
//		                .mapToDouble(gi -> gi.getQuantity() * gi.getItem().getWeight())
//		                .sum();
//		        int totalQuantity = (int) Math.round(totalWeight);
//
//		        
//		        int newTotalQuantity = g.getGodownItems().stream()
//		                .mapToInt(gi -> (int) (gi.getQuantity() * gi.getItem().getWeight()))
//		                .sum();
//
//		        if (totalQuantity + newTotalQuantity > godown.getGodownCapacity()) {
//		            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//		                    .body("Adding the new items will exceed the godown capacity.");
//		        }
//
//		        for (GodownItem godownItem : g.getGodownItems()) {
//		            Optional<Items> optionalItem = itemsRepository.findById(godownItem.getItem().getItemId());
//		            if (optionalItem.isPresent()) {
//		                Items item = optionalItem.get();
//		                GodownItemId godownItemId = new GodownItemId(g.getGodownId(), item.getItemId());
//		                Optional<GodownItem> optionalGodownItem = godownItemRepository.findById(godownItemId);
//		                if (optionalGodownItem.isPresent()) {
//		                    GodownItem existingGodownItem = optionalGodownItem.get();
//		                    existingGodownItem.setQuantity(existingGodownItem.getQuantity() + godownItem.getQuantity());
//		                    godownItemRepository.save(existingGodownItem);
//		                } else {
//		                    GodownItem newGodownItem = new GodownItem();
//		                    newGodownItem.setId(godownItemId);
//		                    newGodownItem.setGodown(godown);
//		                    newGodownItem.setItem(item);
//		                    newGodownItem.setQuantity(godownItem.getQuantity());
//		                    if(godown.getGodownItems() == null) {
//		                        godown.setGodownItems(new HashSet<>());
//		                    }
//		                    godown.getGodownItems().add(newGodownItem);
//		                    godownItemRepository.save(newGodownItem);
//		                    godown.setGodownItems(new HashSet<>(godown.getGodownItems()));
//
//		            }
//		        }
//		        godownRepository.save(godown);
//		        return ResponseEntity.ok().build();
//		        }
//		    }
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Godown not found");
//		}
//}



		

		@PostMapping("/godown/addProducts")
		public ResponseEntity<String> addProducts(@RequestBody Godown g) {
	    Optional<Godown> godownFound = godownRepository.findById(g.getGodownId());
	    if (godownFound.isPresent()) {
	        Godown godown = godownFound.get();

	        // Calculate the total quantity of items in the godown
	        double totalWeight = godown.getGodownItems().stream()
	                .mapToDouble(gi -> gi.getQuantity() * gi.getItem().getWeight())
	                .sum();
	        int totalQuantity = (int) Math.round(totalWeight);

	        // Check if adding the new items will exceed the godown capacity
	        int newTotalQuantity = g.getGodownItems().stream()
	                .mapToInt(gi -> (int) (gi.getQuantity() * gi.getItem().getWeight()))
	                .sum();

	        if (totalQuantity + newTotalQuantity > godown.getGodownCapacity()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body("Adding the new items will exceed the godown capacity.");
	        }

	        for (GodownItem godownItem : g.getGodownItems()) {
	            Optional<Items> optionalItem = itemsRepository.findById(godownItem.getItem().getItemId());
	            if (optionalItem.isPresent()) {
	                Items item = optionalItem.get();
	                GodownItemId godownItemId = new GodownItemId(g.getGodownId(), item.getItemId());
	                Optional<GodownItem> optionalGodownItem = godownItemRepository.findById(godownItemId);
	                if (optionalGodownItem.isPresent()) {
	                    GodownItem existingGodownItem = optionalGodownItem.get();
	                    existingGodownItem.setQuantity(existingGodownItem.getQuantity() + godownItem.getQuantity());
	                    godownItemRepository.save(existingGodownItem);
	                } else {
	                    GodownItem newGodownItem = new GodownItem();
	                    newGodownItem.setId(godownItemId);
	                    newGodownItem.setGodown(godown);
	                    newGodownItem.setItem(item);
	                    newGodownItem.setQuantity(godownItem.getQuantity());
	                    godown.getGodownItems().add(newGodownItem);
//	                    godownItemRepository.save(newGodownItem);
	                }
	            }
	        }
	        godownRepository.save(godown);
	        return ResponseEntity.ok().build();
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Godown not found");
	    }
	}
		
}
