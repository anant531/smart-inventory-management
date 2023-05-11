package com.inventory.JsonCustomizer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.inventory.entities.Employee;

import java.io.IOException;

public class EmployeeSerializer extends JsonSerializer<Employee> {

    @Override
    public void serialize(Employee employee, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
       jsonGenerator.writeStartObject();
       jsonGenerator.writeNumberField("userId", employee.getUserId());
       jsonGenerator.writeStringField("name", employee.getName());
       jsonGenerator.writeStringField("email", employee.getEmail());
       jsonGenerator.writeNumberField("phone", employee.getPhone());
       jsonGenerator.writeStringField("location", employee.getLocation());
       jsonGenerator.writeStringField("imgUrl", employee.getImgUrl());
       jsonGenerator.writeStringField("role" , employee.getRole().getName());
       jsonGenerator.writeEndObject();
    }
}
