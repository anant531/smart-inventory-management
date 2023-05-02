package com.inventory.controllers;

import com.inventory.embeddable.GodownItemId;
import com.inventory.entities.Godown;
import com.inventory.entities.Inward;
import com.inventory.linktables.GodownItem;
import com.inventory.linktables.InwardItem;
import com.inventory.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class InwardController {
	@Autowired
	InwardRepository inwardRepository;

	@Autowired
	GodownRepository godownRepository;

	@Autowired
	ItemsRepository itemsRepository;

	@Autowired
	GodownItemRepository godownItemRepository;

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
		Optional<Godown> godownFound = godownRepository.findById(i.getGodown().getGodownId());
		if(godownFound.isPresent()){
			Godown godown = godownFound.get();
		}

		double totalWeight = 0;

		for(InwardItem inwardItem : i.getInwardItem()){
			GodownItemId godownItemId = new GodownItemId(i.getGodown().getGodownId(), inwardItem.getItem().getItemId());
			Optional<GodownItem> godownItemFound = godownItemRepository.findById(godownItemId);
			if(godownItemFound.isPresent()){
				GodownItem godownItem = godownItemFound.get();
				godownItem.setQuantity(godownItem.getQuantity() + inwardItem.getQuantity());
				godownItemRepository.save(godownItem);
			}
			else{
				GodownItem godownItem = new GodownItem();
				godownItem.setId(godownItemId);
				godownItem.setItem(itemsRepository.findById(inwardItem.getItem().getItemId()).orElse(null));
				godownItem.setGodown(godownRepository.findById(i.getGodown().getGodownId()).orElse(null));
				godownItem.setQuantity(inwardItem.getQuantity());
				godownItemRepository.save(godownItem);
			}

		}

	}

}
