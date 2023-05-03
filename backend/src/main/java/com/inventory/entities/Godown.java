package com.inventory.entities;

import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.inventory.embeddable.GodownItemDeserializer;
import com.inventory.embeddable.GodownItemSerializer;
import com.inventory.embeddable.OutwardDeserializer;
import com.inventory.embeddable.OutwardSerializer;
import com.inventory.linktables.GodownItem;
import com.inventory.linktables.OutwardItem;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class Godown {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long godownId;

	String godownLocation;

	long godownCapacity;

	String supervisor;

	Date startDate;
	
	@OneToMany(mappedBy = "godown", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JsonSerialize(using = GodownItemSerializer.class)
	@JsonDeserialize(contentUsing = GodownItemDeserializer.class)
    private Set<GodownItem> godownItems = new HashSet<>();

	@OneToMany(mappedBy = "godown")
	Set<Inward> inwards = new HashSet<>();

	@OneToMany(mappedBy = "godown")
	private Set<Outward> outward = new HashSet<>();

}
