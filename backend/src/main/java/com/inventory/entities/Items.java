package com.inventory.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inventory.linktables.GodownItem;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class Items {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long itemId;
	
	String itemName;

	@OneToOne
	Category category;

	double amount;
	double weight;
	
	@OneToMany(mappedBy = "item", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JsonIgnore
    private Set<GodownItem> godownItems = new HashSet<>();
}

