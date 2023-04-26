package com.inventory.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Items {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long itemId;
	
	String itemName;
	String supplier;
	String category;
	double amount;
	
	@OneToMany(mappedBy = "item")
    private Set<GodownItem> godownItems = new HashSet<>();
	
	public Items() {

	}


	public Items(long itemId, String itemName, String supplier, String category, double amount,
			Set<GodownItem> godownItems) {
		super();
		this.itemId = itemId;
		this.itemName = itemName;
		this.supplier = supplier;
		this.category = category;
		this.amount = amount;
		this.godownItems = godownItems;
	}


	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}


	public Set<GodownItem> getGodownItems() {
		return godownItems;
	}


	public void setGodownItems(Set<GodownItem> godownItems) {
		this.godownItems = godownItems;
	}


	@Override
	public String toString() {
		return "Items [itemId=" + itemId + ", itemName=" + itemName + ", supplier=" + supplier + ", category="
				+ category + ", amount=" + amount + ", godownItems=" + godownItems + "]";
	}


}
