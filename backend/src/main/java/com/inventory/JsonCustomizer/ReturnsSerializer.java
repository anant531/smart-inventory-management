package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.inventory.entities.Returns;
import com.inventory.linktables.ReturnItem;

import java.io.IOException;

public class ReturnsSerializer extends JsonSerializer<Returns> {

    @Override
    public void serialize(Returns returns, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("returnsId", returns.getReturnId());
        jsonGenerator.writeStringField("address", returns.getAddress());
        jsonGenerator.writeNumberField("billNumber", returns.getBillNumber());
        jsonGenerator.writeNumberField("billValue", returns.getBillValue());
        jsonGenerator.writeStringField("reason", returns.getReason());
        jsonGenerator.writeStringField("dateOfReturn", String.valueOf(returns.getDateOfReturn()));
        jsonGenerator.writeArrayFieldStart("returnItems");
        for (ReturnItem returnItem: returns.getReturnItem()) {
            jsonGenerator.writeStartObject();
            jsonGenerator.writeNumberField("itemId", returnItem.getItem().getItemId());
            jsonGenerator.writeNumberField("quantity", returnItem.getQuantity());
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndObject();
    }
}


