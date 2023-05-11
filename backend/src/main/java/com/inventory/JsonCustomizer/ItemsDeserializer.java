package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.inventory.entities.Category;
import com.inventory.entities.Items;
import com.inventory.repositories.CategoryRepository;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.ItemsRepository;
import com.inventory.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Optional;

public class ItemsDeserializer extends JsonDeserializer<Items> {

    @Autowired
    GodownRepository godownRepository;

    @Autowired
    ItemsRepository itemsRepository;

    @Autowired
    SupplierRepository supplierRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public Items deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException {
        ObjectCodec codec = jsonParser.getCodec();
        JsonNode node = codec.readTree(jsonParser);

        String itemName = node.get("itemName").asText();
        String categoryName = node.get("category").asText();
        double amount = node.get("amount").asDouble();
        double weight = node.get("weight").asDouble();

        Optional<Category> categoryFound = categoryRepository.findByCategory(categoryName);
        Category category;
        if(categoryFound.isEmpty()){
            category = new Category();
            category.setCategory(categoryName);
            categoryRepository.save(category);
        }
        else{
            category = categoryFound.get();
        }

        return new Items(itemName, category, amount, weight);
    }
}
