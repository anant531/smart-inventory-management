package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.inventory.entities.Items;

import java.io.IOException;

public class ItemsSerializer extends JsonSerializer<Items> {

    @Override
    public void serialize(Items items, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("itemId", items.getItemId());
        jsonGenerator.writeStringField("itemName", items.getItemName());
        jsonGenerator.writeStringField("category", items.getCategory().getCategory());
        jsonGenerator.writeNumberField("amount", items.getAmount());
        jsonGenerator.writeNumberField("weight", items.getWeight());
        jsonGenerator.writeEndObject();
    }
}
