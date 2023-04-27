package com.inventory.embeddable;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.inventory.entities.GodownItem;
import com.inventory.entities.Items;

public class GodownItemDeserializer extends StdDeserializer<GodownItem> {

    public GodownItemDeserializer() {
        this(null);
    }

    public GodownItemDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public GodownItem deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        ObjectCodec codec = jsonParser.getCodec();
        JsonNode node = codec.readTree(jsonParser);

        Long itemId = node.get("itemId").asLong();
        int quantity = node.get("quantity").asInt();

        GodownItem godownItem = new GodownItem();
        godownItem.setQuantity(quantity);

        Items item = new Items();
        item.setItemId(itemId);
        godownItem.setItem(item);

        return godownItem;
    }
}
