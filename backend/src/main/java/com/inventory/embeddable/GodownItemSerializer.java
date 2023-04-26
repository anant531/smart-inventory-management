package com.inventory.embeddable;

import java.io.IOException;
import java.util.Set;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.inventory.entities.GodownItem;

public class GodownItemSerializer extends JsonSerializer<Set<GodownItem>> {

    @Override
    public void serialize(Set<GodownItem> godownItems, JsonGenerator jsonGenerator,
                          SerializerProvider serializerProvider) throws IOException {

        jsonGenerator.writeStartArray();
        for (GodownItem godownItem : godownItems) {
            jsonGenerator.writeStartObject();
            jsonGenerator.writeNumberField("itemId", godownItem.getItem().getItemId());
            jsonGenerator.writeNumberField("quantity", godownItem.getQuantity());
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();
    }
}

