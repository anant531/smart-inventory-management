package com.inventory.entities;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

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

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinColumn(name = "godown_id", nullable = false)
	private Godown godown;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "inward_item",
			joinColumns = @JoinColumn(name = "inward_id"),
			inverseJoinColumns = @JoinColumn(name = "item_id"))
	private Set<Items> items = new HashSet<>();
	
	String nameofSupplier;
	Date dateOfSupply;
	
	long invoice;
	long quantity;
	
	String received;
	long receiptNo;
	String billCheckedBy;
	
}
