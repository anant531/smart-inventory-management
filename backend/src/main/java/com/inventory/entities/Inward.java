package com.inventory.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.inventory.JsonCustomizer.InwardDeserializer;
import com.inventory.JsonCustomizer.InwardSerializer;
import com.inventory.linktables.InwardItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize(using = InwardSerializer.class)
@JsonDeserialize(using = InwardDeserializer.class)
public class Inward {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long inwardId;

	@ManyToOne()
	@JoinColumn(name = "godown_id")
	Godown godown;

	@OneToMany(mappedBy = "inward", cascade = CascadeType.ALL)
	private Set<InwardItem> inwardItem = new HashSet<>();

	@OneToOne
	Supplier supplier;

	String billCheckedBy;

	LocalDateTime dateOfSupply;

	long invoiceNo;

	long receiptNo;

	String receivedBy;

	public Inward(Godown godown, Set<InwardItem> inwardItem, Supplier supplier, String billCheckedBy, LocalDateTime dateOfSupply, long invoiceNo, long receiptNo, String receivedBy) {
		this.godown = godown;
		this.inwardItem = inwardItem;
		this.supplier = supplier;
		this.billCheckedBy = billCheckedBy;
		this.dateOfSupply = dateOfSupply;
		this.invoiceNo = invoiceNo;
		this.receiptNo = receiptNo;
		this.receivedBy = receivedBy;
	}

	@Override
	public String toString() {
		return "Inward{" +
				"inwardId=" + inwardId +
				", godown=" + godown.getGodownId() +
				", inwardItem=" + inwardItem +
				'}';
	}
}
