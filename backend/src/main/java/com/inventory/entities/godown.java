package com.inventory.entities;

import java.sql.Date;

//import java.text.SimpleDateFormat;

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

	Date startDate;

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

//	public String getStartDate() {
//		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
//		String formattedDate = formatter.format(startDate);
//		return formattedDate;
//	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Override
	public String toString() {
		return "godown [godownId=" + godownId + ", godownLocation=" + godownLocation + ", godownCapacity="
				+ godownCapacity + ", supervisor=" + supervisor + ", startDate=" + startDate + "]";
	}


}
