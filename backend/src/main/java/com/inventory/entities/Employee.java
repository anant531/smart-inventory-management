package com.inventory.entities;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Employee{
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long userId;
	
	String userName;
	
	@ManyToOne(cascade = CascadeType.ALL)
	Roles role;
	
	public Employee() {
		
	}

	public Employee(long userId, String userName, Roles role) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.role = role;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Roles getRole() {
		return role;
	}

	public void setRole(Roles role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "Employee [userId=" + userId + ", userName=" + userName + ", role=" + role + "]";
	}
	
}
