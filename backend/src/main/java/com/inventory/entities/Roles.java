package com.inventory.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Roles {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	
	String name;

	public Roles() {

	}

	public Roles(long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Roles [id=" + id + ", name=" + name + "]";
	}

}
