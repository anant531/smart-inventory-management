package com.inventory.controllers;

import com.inventory.embeddable.GodownItemId;
import com.inventory.entities.Godown;
import com.inventory.entities.Outward;
import com.inventory.linktables.GodownItem;
import com.inventory.linktables.InwardItem;
import com.inventory.linktables.OutwardItem;
import com.inventory.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class OutwardController {

    @Autowired
    GodownRepository godownRepository;

    @Autowired
    ItemsRepository itemsRepository;

    @Autowired
    OutwardItemRepository outwardItemRepository;
    @Autowired
    OutwardRepository outwardRepository;

    @Autowired
    GodownItemRepository godownItemRepository;

    @GetMapping(path = "/outward")
    public List<Outward> getOutward(){
        return outwardRepository.findAll();
    }

    @PostMapping(path = "/outward")
    public void addOutward(@RequestBody Outward o){
        for(OutwardItem outwardItem : o.getOutwardItem()){
            outwardItem.setOutward(o);
        }

        Optional<Godown> godownFound = godownRepository.findById(o.getGodown().getGodownId());
		if(godownFound.isPresent()){
			Godown godown = godownFound.get();
		}

		double totalWeight = 0;

		for(OutwardItem outwardItem : o.getOutwardItem()){
			GodownItemId godownItemId = new GodownItemId(o.getGodown().getGodownId(), outwardItem.getItem().getItemId());
			Optional<GodownItem> godownItemFound = godownItemRepository.findById(godownItemId);
			if(godownItemFound.isPresent()){
				GodownItem godownItem = godownItemFound.get();
                if(godownItem.getQuantity() > outwardItem.getQuantity()){
                    godownItem.setQuantity(godownItem.getQuantity() - outwardItem.getQuantity());
                    godownItemRepository.save(godownItem);
                    outwardRepository.save(o);
                }
                else if(godownItem.getQuantity() == outwardItem.getQuantity()){
                    godownItemRepository.delete(godownItem);
                    outwardRepository.save(o);
                }

                else{
                    System.out.println("Only " + godownItem.getQuantity() + " available inside the godown");

                }

			}

            else{
                System.out.println("Item not found");
            }
		}
    }

//    @PostMapping(path = "/outward")
//    public void removeGodownItems(@PathVariable Long godownId, @RequestBody List<GodownItem> godownItems) {
//        Optional<Godown> godownFound = godownRepository.findById(godownId);
//        if (godownFound.isPresent()) {
//            Godown godown = godownFound.get();
//            for (GodownItem godownItem : godownItems) {
//                GodownItemId godownItemId = new GodownItemId(godown.getGodownId(), godownItem.getItem().getItemId());
//                Optional<GodownItem> godownItemFound = godownItemRepository.findById(godownItemId);
//                if (godownItemFound.isPresent()) {
//                    GodownItem existingGodownItem = godownItemFound.get();
//                    existingGodownItem.setQuantity(existingGodownItem.getQuantity() - godownItem.getQuantity());
//                    godownItemRepository.save(existingGodownItem);
//                }
//            }
//        }
//    }

}
