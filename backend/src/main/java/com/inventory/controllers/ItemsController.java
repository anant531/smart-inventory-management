package com.inventory.controllers;

import com.inventory.entities.Items;
import com.inventory.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ItemsController {

	@Autowired
	ItemsRepository itemsRepository;

	@GetMapping("/items")
	public List<Items> getAllItems(){
		return itemsRepository.findAll();
	}

//	@GetMapping("/items/{itemName}")
//	public Items getItemsById(String itemName) {
//        return itemsRepository.findBy(itemName).orElse(null)
//	}

	@PostMapping("/items")
	public void addItems(@RequestBody Items item) {
		itemsRepository.save(item);
	}

	@DeleteMapping(path = "/items")
	public void deleteItem(@RequestBody Items item){
		Optional<Items> itemFound = itemsRepository.findById(item.getItemId());
		if(itemFound.isPresent()){
			itemsRepository.delete(item);
		}
	}

	@PutMapping(path = "/items")
	public void updateItem(@RequestBody Items item){
		itemsRepository.save(item);
	}

}


