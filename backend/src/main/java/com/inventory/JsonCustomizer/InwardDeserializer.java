package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.inventory.entities.Inward;
import com.inventory.entities.Supplier;
import com.inventory.linktables.InwardItem;
import com.inventory.repositories.GodownRepository;
import com.inventory.repositories.ItemsRepository;
import com.inventory.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

public class InwardDeserializer extends JsonDeserializer<Inward> {

    @Autowired
    GodownRepository godownRepository;

    @Autowired
    ItemsRepository itemsRepository;

    @Autowired
    SupplierRepository supplierRepository;

    @Override
    public Inward deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException {
        ObjectCodec codec = jsonParser.getCodec();
        JsonNode node = codec.readTree(jsonParser);

        long godownId = node.get("godownId").asLong();
        String supplierName = node.get("supplier").asText();
        Supplier supplier = supplierRepository.findBySupplierName(supplierName);
        Set<InwardItem> inwardItems = new HashSet<>();
        JsonNode inwardItemNode = node.get("inwardItem");
        if(inwardItemNode.isArray()){
            for(JsonNode gn : inwardItemNode){
                long itemId = gn.get("itemId").asLong();
                int quantity = gn.get("quantity").asInt();
                InwardItemId inwardItemId = new InwardItemId((long)0, itemId);
                InwardItem inwardItem = new InwardItem();
                inwardItem.setId(inwardItemId);
                inwardItem.setItem(itemsRepository.findById(itemId).orElse(null));
                inwardItem.setQuantity(quantity);
                inwardItems.add(inwardItem);
            }
        }

        String billCheckedBy = node.get("billCheckedBy").asText();
        long invoiceNo = node.get("invoiceNo").asLong();
        long receiptNo = node.get("receiptNo").asLong();
        String receivedBy = node.get("receivedBy").asText();


        return new Inward(godownRepository.findById(godownId).orElse(null), inwardItems, supplier, billCheckedBy, LocalDateTime.now(),invoiceNo,receiptNo,receivedBy);
    }
}
