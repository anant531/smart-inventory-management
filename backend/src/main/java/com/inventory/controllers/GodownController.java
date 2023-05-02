package com.inventory.controllers;

import com.inventory.embeddable.GodownItemId;
import com.inventory.entities.Godown;
import com.inventory.entities.GodownItem;
import com.inventory.entities.Inward;
import com.inventory.entities.Items;
import com.inventory.repositories.GodownItemRepository;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.InwardRepository;
import com.inventory.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
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

		@Autowired
	    InwardRepository inwardRepository;

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
		public double calcualteCapacity(Godown godown){
			double totalWeight = godown.getGodownItems().stream()
					.mapToDouble(gi -> gi.getQuantity() * gi.getItem().getWeight()).sum();

			return ((double) Math.round(totalWeight) / 100);
		}

//		@PostMapping("/godown/addProducts")
//		public void addProducts(@RequestBody Godown g, @RequestParam("godownId") Long godownId, @RequestParam("quantity") Integer quantity, @RequestParam("NameofSupplier") String supplierName, @RequestParam("dateOfSupply") Date dateOfSupply, @RequestParam("invoice") long invoiceNo, @RequestParam("received") String receivedBy, @RequestParam("receiptNo") long receiptNo, @RequestParam("billCheckedBy") String billCheckedBy) {
//			Optional<Godown> godownFound = godownRepository.findById(g.getGodownId());
//			if(godownFound.isPresent()) {
//				Godown godown = godownFound.get();
//				for (GodownItem godownItem : g.getGodownItems()) {
//			        Optional<Items> optionalItem = itemsRepository.findById(godownItem.getItem().getItemId());
//			        if (optionalItem.isPresent()) {
//			        	Items item = optionalItem.get();
//				        GodownItemId godownItemId = new GodownItemId(g.getGodownId(), item.getItemId());
//				        Optional<GodownItem> godownItemFound = godownItemRepository.findById(godownItemId);
//				        if(godownItemFound.isPresent()) {
//				        	GodownItem existingGodownItem = godownItemFound.get();
//				        	existingGodownItem.setQuantity(godownItem.getQuantity() + existingGodownItem.getQuantity());
//
//							if(calcualteCapacity(godown) <= godown.getGodownCapacity()) {
//								godownItemRepository.save(existingGodownItem);
//							}
//				        }
//				        else {
//				        	godownItem.setId(godownItemId);
//					        godownItem.setGodown(godown);
//					        godownItem.setItem(item);
//					        godown.getGodownItems().add(godownItem);
//						}
//
//						Inward inward = new Inward();
//						inward.setGodown(godown);
//						inward.setItem(item);
//						inward.setQuantity(quantity);
//						inward.setNameofSupplier(supplierName);
//						inward.setDateOfSupply(dateOfSupply);
//						inward.setInvoice(invoiceNo);
//						inward.setReceived(receivedBy);
//						inward.setReceiptNo(receiptNo);
//						inward.setBillCheckedBy(billCheckedBy);
//						inwardRepository.save(inward);
//			        }
//			    }
//
//				if(calcualteCapacity(godown)  <= godown.getGodownCapacity()){
//					godownRepository.save(godown);
//				}
//
//				else{
//					System.out.println("EZ");
//				}
//			}
//		}

	@PostMapping("/godown/addProducts")
	public void addProducts(@RequestBody Godown g, @RequestParam("godownId") Long godownId, @RequestParam("quantity") Integer quantity, @RequestParam("NameofSupplier") String supplierName, @RequestParam("dateOfSupply") Date dateOfSupply, @RequestParam("invoice") long invoiceNo, @RequestParam("received") String receivedBy, @RequestParam("receiptNo") long receiptNo, @RequestParam("billCheckedBy") String billCheckedBy) {
		Optional<Godown> godownFound = godownRepository.findById(g.getGodownId());
		List<Items> allItems = new ArrayList<>();
		if (godownFound.isPresent()) {
			Godown godown = godownFound.get();
			for (GodownItem godownItem : g.getGodownItems()) {
				Optional<Items> optionalItem = itemsRepository.findById(godownItem.getItem().getItemId());
				allItems.add(optionalItem.get());
				if (optionalItem.isPresent()) {
					Items item = optionalItem.get();
					GodownItemId godownItemId = new GodownItemId(g.getGodownId(), item.getItemId());
					Optional<GodownItem> godownItemFound = godownItemRepository.findById(godownItemId);
					if (godownItemFound.isPresent()) {
						GodownItem existingGodownItem = godownItemFound.get();
						existingGodownItem.setQuantity(godownItem.getQuantity() + existingGodownItem.getQuantity());

						if (calcualteCapacity(godown) <= godown.getGodownCapacity()) {
							godownItemRepository.save(existingGodownItem);
						}
					} else {
						godownItem.setId(godownItemId);
						godownItem.setGodown(godown);
						godownItem.setItem(item);
						godown.getGodownItems().add(godownItem);
					}

					Inward inward = new Inward();
					inward.setGodown(godown);
					inward.setItem(allItems);
					inward.setQuantity(quantity);
					inward.setNameofSupplier(supplierName);
					inward.setDateOfSupply(dateOfSupply);
					inward.setInvoice(invoiceNo);
					inward.setReceived(receivedBy);
					inward.setReceiptNo(receiptNo);
					inward.setBillCheckedBy(billCheckedBy);
					inwardRepository.save(inward);
				}
			}

			if (calcualteCapacity(godown) <= godown.getGodownCapacity()) {
				godownRepository.save(godown);
			} else {
				System.out.println("EZ");
			}
		}
	}

}

}
