package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.inventory.entities.Outward;
import com.inventory.linktables.OutwardItem;

import java.io.IOException;

public class OutwardSerializer extends JsonSerializer<Outward> {

    @Override
    public void serialize(Outward outward, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("outwardId", outward.getOutwardId());
        jsonGenerator.writeNumberField("godownId", outward.getGodown().getGodownId());
        jsonGenerator.writeStringField("deliveredTo", outward.getDeliveredTo());
        jsonGenerator.writeStringField("destination", outward.getDestination());
        jsonGenerator.writeArrayFieldStart("outwardItem");
        for (OutwardItem outwardItem : outward.getOutwardItem()) {
            jsonGenerator.writeStartObject();
            jsonGenerator.writeNumberField("itemId", outwardItem.getItem().getItemId());
            jsonGenerator.writeNumberField("quantity", outwardItem.getQuantity());
            jsonGenerator.writeEndObject();
        }
        jsonGenerator.writeEndArray();
        jsonGenerator.writeStringField("billCheckedBy", outward.getBillCheckedBy());
        jsonGenerator.writeStringField("dateOfDelivery", String.valueOf(outward.getDeliveryDate()));
        jsonGenerator.writeNumberField("billValue", outward.getBillValue());
        jsonGenerator.writeNumberField("billNo", outward.getBillNumber());
        jsonGenerator.writeEndObject();
    }
}


