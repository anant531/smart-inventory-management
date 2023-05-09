package com.inventory.controllers;

import com.inventory.entities.Supplier;
import com.inventory.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SupplierController {

    @Autowired
    SupplierRepository supplierRepository;

    @GetMapping(path = "/supplier")
    public List<Supplier> getAllSupplier(){
        return supplierRepository.findAll();
    }

    @PostMapping(path = "/supplier")
    public void addSupplier(@RequestBody Supplier s){
        supplierRepository.save(s);
    }
}
