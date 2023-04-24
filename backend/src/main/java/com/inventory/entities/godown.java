package com.inventory.entities;

import java.sql.Date;
import java.util.List;

//import java.text.SimpleDateFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class godown {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long godownId;

	String godownLocation;

	long godownCapacity;

	String supervisor;

	Date startDate;
	
	@ManyToMany
	@JoinTable(name = "godown_item",
    			joinColumns = @JoinColumn(name = "godown_id"),
    			inverseJoinColumns = @JoinColumn(name = "item_id"))
	List<Items> items;
	
	public godown() {
		
	}

	public godown(Long godownId, String godownLocation, long godownCapacity, String supervisor, Date startDate,
			List<Items> items) {
		super();
		this.godownId = godownId;
		this.godownLocation = godownLocation;
		this.godownCapacity = godownCapacity;
		this.supervisor = supervisor;
		this.startDate = startDate;
		this.items = items;
	}


	public Long getGodownId() {
		return godownId;
	}

	public void setGodownId(Long godownId) {
		this.godownId = godownId;
	}

	public String getGodownLocation() {
		return godownLocation;
	}

	public void setGodownLocation(String godownLocation) {
		this.godownLocation = godownLocation;
	}

	public long getGodownCapacity() {
		return godownCapacity;
	}

	public String getSupervisor() {
		return supervisor;
	}

	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public List<Items> getItems() {
		return items;
	}

	public void setItems(List<Items> items) {
		this.items = items;
	}

	public void setGodownCapacity(long godownCapacity) {
		this.godownCapacity = godownCapacity;
	}

	@Override
	public String toString() {
		return "godown [godownId=" + godownId + ", godownLocation=" + godownLocation + ", godownCapacity="
				+ godownCapacity + ", supervisor=" + supervisor + ", startDate=" + startDate + ", items=" + items + "]";
	}

}
