package com.inventory.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class godown {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long godownId;
	
	String godownLocation;
	
	int godownCapacity;
	
	String supervisor;
	
	LocalDate startDate;

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

	public int getGodownCapacity() {
		return godownCapacity;
	}

	public void setGodownCapacity(int godownCapacity) {
		this.godownCapacity = godownCapacity;
	}

	public String getSupervisor() {
		return supervisor;
	}

	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	@Override
	public String toString() {
		return "godown [godownId=" + godownId + ", godownLocation=" + godownLocation + ", godownCapacity="
				+ godownCapacity + ", supervisor=" + supervisor + ", startDate=" + startDate + "]";
	}
	

}
