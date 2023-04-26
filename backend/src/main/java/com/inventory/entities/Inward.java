package com.inventory.entities;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Inward {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long inwardId;
	
	@ManyToOne(cascade = CascadeType.ALL)
	Godown godown;
	
	String nameofSupplier;
	Date dateOfSupply;
	
	long invoice;
	long quantity;
	
	String received;
	long receiptNo;
	String billCheckedBy;
	
	public Inward() {
		
	}

	public Inward(long inwardId, com.inventory.entities.Godown godown, List<Items> item, String nameofSupplier,
			Date dateOfSupply, long invoice, long quantity, String received, long receiptNo, String billCheckedBy) {
		super();
		this.inwardId = inwardId;
		this.godown = godown;
		this.nameofSupplier = nameofSupplier;
		this.dateOfSupply = dateOfSupply;
		this.invoice = invoice;
		this.quantity = quantity;
		this.received = received;
		this.receiptNo = receiptNo;
		this.billCheckedBy = billCheckedBy;
	}

	public long getInwardId() {
		return inwardId;
	}

	public void setInwardId(long inwardId) {
		this.inwardId = inwardId;
	}

	public Godown getGodown() {
		return godown;
	}

	public void setGodown(Godown godown) {
		this.godown = godown;
	}

	public String getNameofSupplier() {
		return nameofSupplier;
	}

	public void setNameofSupplier(String nameofSupplier) {
		this.nameofSupplier = nameofSupplier;
	}

	public Date getDateOfSupply() {
		return dateOfSupply;
	}

	public void setDateOfSupply(Date dateOfSupply) {
		this.dateOfSupply = dateOfSupply;
	}

	public long getInvoice() {
		return invoice;
	}

	public void setInvoice(long invoice) {
		this.invoice = invoice;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}

	public String getReceived() {
		return received;
	}

	public void setReceived(String received) {
		this.received = received;
	}

	public long getReceiptNo() {
		return receiptNo;
	}

	public void setReceiptNo(long receiptNo) {
		this.receiptNo = receiptNo;
	}

	public String getBillCheckedBy() {
		return billCheckedBy;
	}

	public void setBillCheckedBy(String billCheckedBy) {
		this.billCheckedBy = billCheckedBy;
	}

	@Override
	public String toString() {
		return "Inward [inwardId=" + inwardId + ", godown=" + godown + ", nameofSupplier="
				+ nameofSupplier + ", dateOfSupply=" + dateOfSupply + ", invoice=" + invoice + ", quantity=" + quantity
				+ ", received=" + received + ", receiptNo=" + receiptNo + ", billCheckedBy=" + billCheckedBy + "]";
	}
	
	
	
}
