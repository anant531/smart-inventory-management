package com.inventory.controllers;

import com.inventory.JsonCustomizer.GodownItemId;
import com.inventory.JsonCustomizer.OutwardItemId;
import com.inventory.entities.Outward;
import com.inventory.entities.Returns;
import com.inventory.linktables.GodownItem;
import com.inventory.linktables.OutwardItem;
import com.inventory.linktables.ReturnItem;
import com.inventory.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ReturnController {

    @Autowired
    ReturnsRepository returnsRepository;

    @Autowired
    OutwardRepository outwardRepository;

    @Autowired
    ItemsRepository itemsRepository;

    @Autowired
    GodownItemRepository godownItemRepository;

    @Autowired
    OutwardItemRepository outwardItemRepository;

    @Autowired
    GodownRepository godownRepository;


    @GetMapping(path = "/return")
    public List<Returns> getReturns(){
        return returnsRepository.findAll();
    }

    public void saveGodownItem(Optional<GodownItem> godownItemFound, ReturnItem returnItem, GodownItemId godownItemId, Optional<Outward> outwardFound){
        if(godownItemFound.isPresent()){
            GodownItem godownItem = godownItemFound.get();
            godownItem.setQuantity(godownItem.getQuantity() + returnItem.getQuantity());
            godownItemRepository.save(godownItem);
        }
        else{
            GodownItem godownItem = new GodownItem();
            godownItem.setId(godownItemId);
            godownItem.setGodown(godownRepository.findById(outwardFound.get().getGodown().getGodownId()).get());
            godownItem.setItem(itemsRepository.findById(returnItem.getItem().getItemId()).get());
            godownItem.setQuantity(returnItem.getQuantity());
            godownItemRepository.save(godownItem);
        }
    }
    @PostMapping(path = "/return")
    public void addReturns(@RequestBody Returns r){
        for(ReturnItem returnItem : r.getReturnItem()){
            returnItem.setReturns(r);
        }

        int count = 0;

        if(!r.getReason().equalsIgnoreCase("damaged")){
            Optional<Outward> outwardFound = outwardRepository.findByBillNumber(r.getBillNumber());
            if(outwardFound.isPresent()){
                for(ReturnItem returnItem : r.getReturnItem()){
                    OutwardItemId outwardItemId = new OutwardItemId(outwardFound.get().getOutwardId(), returnItem.getItem().getItemId());
                    Optional<OutwardItem> outwardItemFound = outwardItemRepository.findById(outwardItemId);
                    if(outwardItemFound.isPresent()){
                        OutwardItem outwardItem = outwardItemFound.get();
                        if(outwardItem.getQuantity() > returnItem.getQuantity()){
                            outwardItem.setQuantity(outwardItem.getQuantity() - returnItem.getQuantity());
                            outwardItemRepository.save(outwardItem);
                            GodownItemId godownItemId = new GodownItemId(outwardFound.get().getGodown().getGodownId(), returnItem.getItem().getItemId());
                            Optional<GodownItem> godownItemFound = godownItemRepository.findById(godownItemId);
                            saveGodownItem(godownItemFound, returnItem, godownItemId, outwardFound);
                            returnsRepository.save(r);
                        }

                        else if(outwardItem.getQuantity() == returnItem.getQuantity()){
                            outwardItemRepository.delete(outwardItem);
                            GodownItemId godownItemId = new GodownItemId(outwardFound.get().getGodown().getGodownId(), returnItem.getItem().getItemId());
                            Optional<GodownItem> godownItemFound = godownItemRepository.findById(godownItemId);
                            saveGodownItem(godownItemFound, returnItem, godownItemId, outwardFound);
                            returnsRepository.save(r);
                        }

                        else {
                            System.out.println("KEKW");
                        }
                    }
                }

            }
        }

    }
}
