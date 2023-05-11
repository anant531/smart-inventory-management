package com.inventory.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.inventory.JsonCustomizer.EmployeeDeserializer;
import com.inventory.JsonCustomizer.EmployeeSerializer;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
@JsonSerialize(using = EmployeeSerializer.class)
@JsonDeserialize(using = EmployeeDeserializer.class)
@NoArgsConstructor
public class Employee{


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long userId;

	String name;
	String email;
	long phone;
	String location;
	String imgUrl;

	@OneToOne()
	@JoinColumn(name = "role_id")
	Roles role;

	public Employee(String name, String email, long phone, String location, String imgUrl, Roles role) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.location = location;
		this.imgUrl = imgUrl;
		this.role = role;
	}
}
