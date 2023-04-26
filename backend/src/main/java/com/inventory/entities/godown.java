package com.inventory.entities;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

//import java.text.SimpleDateFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class godown {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long godownId;

	String godownLocation;

	long godownCapacity;

	String supervisor;

	Date startDate;
	
	@OneToMany(mappedBy = "godown")
    private Set<GodownItem> godownItems = new HashSet<>();
	
	public godown() {
		
	}

	public godown(Long godownId, String godownLocation, long godownCapacity, String supervisor, Date startDate,
			Set<GodownItem> godownItems) {
		super();
		this.godownId = godownId;
		this.godownLocation = godownLocation;
		this.godownCapacity = godownCapacity;
		this.supervisor = supervisor;
		this.startDate = startDate;
		this.godownItems = godownItems;
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


	public Set<GodownItem> getGodownItems() {
		return godownItems;
	}

	public void setGodownItems(Set<GodownItem> godownItems) {
		this.godownItems = godownItems;
	}

	public void setGodownCapacity(long godownCapacity) {
		this.godownCapacity = godownCapacity;
	}

	@Override
	public String toString() {
		return "godown [godownId=" + godownId + ", godownLocation=" + godownLocation + ", godownCapacity="
				+ godownCapacity + ", supervisor=" + supervisor + ", startDate=" + startDate + ", godownItems="
				+ godownItems + "]";
	}

}
