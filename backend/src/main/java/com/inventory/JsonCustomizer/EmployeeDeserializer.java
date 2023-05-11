package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.inventory.entities.Employee;
import com.inventory.entities.Roles;
import com.inventory.repositories.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Optional;

public class EmployeeDeserializer extends JsonDeserializer<Employee> {

    @Autowired
    RolesRepository rolesRepository;

    @Override
    public Employee deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException {
        ObjectCodec codec = jsonParser.getCodec();
        JsonNode node = codec.readTree(jsonParser);

        String name = node.get("name").asText();
        String email = node.get("email").asText();
        long phone = node.get("phone").asLong();
        String location = node.get("location").asText();
        String imgUrl = node.get("imgUrl").asText();

        String roleName = node.get("name").asText();

        Optional<Roles> roleFound = rolesRepository.findByName(roleName);
        Roles role = new Roles();
        if(roleFound.isPresent()){
            role = roleFound.get();
        }

        return new Employee(name, email, phone, location, imgUrl, role);
    }
}
