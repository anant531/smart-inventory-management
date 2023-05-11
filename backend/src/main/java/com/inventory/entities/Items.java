package com.inventory.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.inventory.JsonCustomizer.ItemsDeserializer;
import com.inventory.JsonCustomizer.ItemsSerializer;
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
@JsonSerialize(using = ItemsSerializer.class)
@JsonDeserialize(using = ItemsDeserializer.class)
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

	public Items(String itemName, Category category, double amount, double weight) {
		this.itemName = itemName;
		this.category = category;
		this.amount = amount;
		this.weight = weight;
	}
}

