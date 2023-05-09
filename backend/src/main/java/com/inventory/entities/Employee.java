package com.inventory.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

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

	@OneToMany
	List<Godown> godownList;

	@OneToOne()
	@JoinColumn(name = "role_id")
	Roles role;

}
