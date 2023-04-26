package com.inventory.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inventory.embeddable.GodownItemId;

@Entity
public class GodownItem {
    
	@EmbeddedId
	GodownItemId id = new GodownItemId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("godownId")
    @JsonIgnore
    private Godown godown;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemId")
    @JsonIgnore
    private Items item;

    private int quantity;
    
    
    public GodownItem() {
    	
    }

	public GodownItem(GodownItemId id, com.inventory.entities.Godown godown, Items item, int quantity) {
		super();
		this.id = id;
		this.godown = godown;
		this.item = item;
		this.quantity = quantity;
	}


	public GodownItemId getId() {
		return id;
	}

	public void setId(GodownItemId id) {
		this.id = id;
	}

	public Godown getGodown() {
		return godown;
	}

	public void setGodown(Godown godown) {
		this.godown = godown;
	}

	public Items getItem() {
		return item;
	}
	
    public void setItem(Items item) {
        this.item = item;
    }

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "GodownItem [id=" + id + ", godown=" + godown.getGodownId() + ", item=" + item.getItemId() + ", quantity=" + quantity + "]";
	}
    
}
