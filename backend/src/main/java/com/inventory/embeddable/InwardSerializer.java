package com.inventory.embeddable;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.inventory.entities.Inward;
import com.inventory.linktables.InwardItem;

import java.io.IOException;

public class InwardSerializer extends JsonSerializer<Inward> {

    @Override
    public void serialize(Inward inward, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("inwardId", inward.getInwardId());
        jsonGenerator.writeNumberField("godownId", inward.getGodown().getGodownId());

        jsonGenerator.writeFieldName("InwardGodownItem");
        jsonGenerator.writeStartArray();
        for(InwardItem inwardItem : inward.getInwardItem()){
            jsonGenerator.writeStartObject();
            jsonGenerator.writeNumberField("itemId", inwardItem.getItem().getItemId());
            jsonGenerator.writeNumberField("quantity", inwardItem.getQuantity());
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();
        jsonGenerator.writeStringField("nameofSupplier", inward.getNameofSupplier());
        jsonGenerator.writeEndObject();
    }
}
