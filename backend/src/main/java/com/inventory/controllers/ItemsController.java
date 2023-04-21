package com.inventory.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.entities.Items;
import com.inventory.repositories.ItemsRepository;

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
	public void addItems(@RequestBody Items items) {
		itemsRepository.save(items);
	}

}


