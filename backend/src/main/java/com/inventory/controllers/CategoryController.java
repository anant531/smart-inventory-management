package com.inventory.controllers;

import com.inventory.entities.Category;
import com.inventory.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping(path = "/category")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @PostMapping(path = "/category")
    public void addCategory(@RequestBody Category c){
        categoryRepository.save(c);
    }
}
