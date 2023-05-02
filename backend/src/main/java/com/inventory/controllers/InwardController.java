package com.inventory.controllers;

import com.inventory.entities.Inward;
import com.inventory.linktables.InwardItem;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.InwardItemRepository;
import com.inventory.repositories.InwardRepository;
import com.inventory.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InwardController {
	@Autowired
	InwardRepository inwardRepository;

	@Autowired
	GodownRepository godownRepository;

	@Autowired
	ItemsRepository itemsRepository;

	@Autowired
	InwardItemRepository inwardItemRepository;

	@GetMapping(path = "/inward")
	public List<Inward> getInwards(){
		return inwardRepository.findAll();
	}

	@PostMapping(path = "/inward")
	public void addInward(@RequestBody Inward i) {
		for(InwardItem inwardItem : i.getInwardItem()){
			inwardItem.setInward(i);
		}
		inwardRepository.save(i);

	}

	@GetMapping(path = "/inwardRepo")
	public List<InwardItem> getInwardItem(){
		return inwardItemRepository.findAll();
	}
}
