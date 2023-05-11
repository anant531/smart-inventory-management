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

	@GetMapping("/items/{id}")
	public Items getItemsById(@PathVariable long id) {
        return itemsRepository.findById(id).orElse(null);
	}

	@PostMapping("/items")
	public void addItems(@RequestBody Items item) {
		Optional<Category> categoryFound = categoryRepository.findByCategory(item.getCategory().getCategory());
		categoryFound.ifPresent(item::setCategory);

		itemsRepository.save(item);
	}

	@DeleteMapping(path = "/items/{id}")
	public void deleteItem(@PathVariable long id){
		Optional<Items> itemFound = itemsRepository.findById(id);
		if(itemFound.isPresent()){
			itemsRepository.delete(itemFound.get());
		}
	}

	@PutMapping(path = "/items/{id}")
	public void updateItem(@RequestBody Items item){
		itemsRepository.save(item);
	}

}


