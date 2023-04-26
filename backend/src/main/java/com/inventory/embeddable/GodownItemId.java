package com.inventory.embeddable;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Embeddable
public class GodownItemId implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -2828102166998797765L;
	
	@JsonIgnore
	Long godownId;
	
	Long itemId;
	
	public GodownItemId() {
		
	}
	
	public GodownItemId(Long godownId, Long itemId) {
		super();
		this.godownId = godownId;
		this.itemId = itemId;
	}

	public Long getGodownId() {
		return godownId;
	}

	public void setGodownId(Long godownId) {
		this.godownId = godownId;
	}

	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(godownId, itemId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GodownItemId other = (GodownItemId) obj;
		return Objects.equals(godownId, other.godownId) && Objects.equals(itemId, other.itemId);
	}

	@Override
	public String toString() {
		return "GodownItemId [godownId=" + godownId + ", itemId=" + itemId + "]";
	}
	
}
