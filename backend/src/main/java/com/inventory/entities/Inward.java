package com.inventory.entities;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Inward {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long inwardId;
	
	@ManyToOne(cascade = CascadeType.ALL)
	godown godown;
	@ManyToOne(cascade = CascadeType.ALL)
	Items item;
	
	String nameofSupplier;
	Date dateOfSupply;
	
	long invoice;
	long quantity;
	
	String received;
	long receiptNo;
	String billCheckedBy;
	
	public Inward() {
		
	}
	
}
