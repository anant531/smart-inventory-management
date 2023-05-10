package com.inventory.controllers;

import com.inventory.entities.Category;
import com.inventory.entities.Items;
import com.inventory.repositories.CategoryRepository;
import com.inventory.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ItemsController {

	@Autowired
	ItemsRepository itemsRepository;

	@Autowired
	CategoryRepository categoryRepository;

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
		Category categoryFound = categoryRepository.findByCategory(item.getCategory().getCategory());
		if(categoryFound == null){
			categoryFound = new Category();
			categoryFound = item.getCategory();
			categoryRepository.save(categoryFound);
		}

		item.setCategory(categoryFound);
		itemsRepository.save(item);
	}

	@DeleteMapping(path = "/items")
	public void deleteItem(@RequestBody Items item){
		Optional<Items> itemFound = itemsRepository.findById(item.getItemId());
		if(itemFound.isPresent()){
			itemsRepository.delete(item);
		}
	}

	@PutMapping(path = "/items/{id}")
	public void updateItem(@RequestBody Items item){
		itemsRepository.save(item);
	}

}


