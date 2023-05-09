package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.inventory.entities.Outward;
import com.inventory.linktables.OutwardItem;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

public class OutwardDeserializer extends JsonDeserializer<Outward> {

    @Autowired
    GodownRepository godownRepository;

    @Autowired
    ItemsRepository itemsRepository;

    @Override
    public Outward deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException {
        ObjectCodec codec = jsonParser.getCodec();
        JsonNode node = codec.readTree(jsonParser);

        System.out.println(node);
        double price = 0;
        long godownId = node.get("godownId").asLong();
        String deliveredTo = node.get("deliveredTo").asText();
        String billCheckedBy = node.get("billCheckedBy").asText();
        String destination = node.get("destination").asText();
        long billNumber = node.get("billNumber").asLong();
        Set<OutwardItem> outwardItems = new HashSet<>();
        JsonNode outwardItemNode = node.get("outwardItem");



        OutwardItem outwardItem = new OutwardItem();
        if (outwardItemNode.isArray()) {
            for (JsonNode gn : outwardItemNode) {
                long itemId = gn.get("itemId").asLong();
                int quantity = gn.get("quantity").asInt();
                OutwardItemId outwardItemId = new OutwardItemId((long) 0, itemId);
                outwardItem = new OutwardItem();
                outwardItem.setId(outwardItemId);
                outwardItem.setItem(itemsRepository.findById(itemId).orElse(null));
                outwardItem.setQuantity(quantity);
                outwardItems.add(outwardItem);
                price+=(outwardItem.getItem().getAmount() * outwardItem.getQuantity());
            }
        }

        return new Outward(godownRepository.findById(godownId).orElse(null), outwardItems,LocalDate.now(), deliveredTo,billCheckedBy,destination, price,billNumber);
    }
}


