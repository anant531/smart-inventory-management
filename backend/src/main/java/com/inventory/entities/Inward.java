package com.inventory.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.inventory.embeddable.InwardDeserializer;
import com.inventory.embeddable.InwardSerializer;
import com.inventory.linktables.InwardItem;
import lombok.*;

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

	String nameofSupplier;

	String billCheckedBy;

	LocalDateTime dateOfSupply;

	long invoiceNo;

	long receiptNo;

	String receivedBy;

	public Inward(Godown godown, Set<InwardItem> inwardItems, String nameofSupplier) {
		this.godown = godown;
		this.inwardItem = inwardItems;
		this.nameofSupplier = nameofSupplier;
	}
}
