package com.inventory.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.sql.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Inward {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long inwardId;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("godownId")
	@JsonIgnore
	private Godown godown;

	@ManyToMany(fetch = FetchType.LAZY)
	@MapsId("itemId")
	@JsonIgnore
	private List<Items> item;
	
	String nameofSupplier;
	Date dateOfSupply;
	
	long invoice;
	long quantity;
	
	String received;
	long receiptNo;
	String billCheckedBy;

}
