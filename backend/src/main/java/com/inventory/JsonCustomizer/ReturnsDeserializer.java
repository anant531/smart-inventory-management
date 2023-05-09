package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.inventory.entities.Returns;
import com.inventory.linktables.ReturnItem;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

public class ReturnsDeserializer extends JsonDeserializer<Returns> {

    @Autowired
    GodownRepository godownRepository;

    @Autowired
    ItemsRepository itemsRepository;

    @Override
    public Returns deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException {
        ObjectCodec codec = jsonParser.getCodec();
        JsonNode node = codec.readTree(jsonParser);

        double price = 0;
        String address = node.get("address").asText();
        long billNumber = node.get("billNumber").asLong();
        long billValue = node.get("billValue").asLong();
        String reason = node.get("reason").asText();

        Set<ReturnItem> returnItems = new HashSet<>();
        JsonNode returnItemNode = node.get("returnItem");
        ReturnItem returnItem = new ReturnItem();

        System.out.println(node);
        if (returnItemNode.isArray()) {
            for (JsonNode gn : returnItemNode) {
                long itemId = gn.get("itemId").asLong();
                int quantity = gn.get("quantity").asInt();
                ReturnItemId returnItemId = new ReturnItemId((long) 0, itemId);
                returnItem = new ReturnItem();
                returnItem.setId(returnItemId);
                returnItem.setItem(itemsRepository.findById(itemId).orElse(null));
                returnItem.setQuantity(quantity);
                returnItems.add(returnItem);
//                price+=(outwardItem.getItem().getAmount() * outwardItem.getQuantity());
            }
        }

        return new Returns(address, billNumber, billValue, LocalDateTime.now(), reason, returnItems);
    }
}


