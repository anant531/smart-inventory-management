package com.inventory.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class Employee{


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long userId;

	String userName;
	String email;
	String phone;
	String password;
	String name;
	String location;

	@OneToOne()
	@JoinColumn(name = "role_id")
	Roles role;

}
