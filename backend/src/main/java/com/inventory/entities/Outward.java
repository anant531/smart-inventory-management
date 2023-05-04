package com.inventory.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.inventory.embeddable.InwardDeserializer;
import com.inventory.embeddable.InwardSerializer;
import com.inventory.embeddable.OutwardDeserializer;
import com.inventory.embeddable.OutwardSerializer;
import com.inventory.linktables.InwardItem;
import com.inventory.linktables.OutwardItem;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize(using = OutwardSerializer.class)
@JsonDeserialize(using = OutwardDeserializer.class)
public class Outward {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long outwardId;

    @ManyToOne()
    @JoinColumn(name = "godown_id")
    Godown godown;

    @OneToMany(mappedBy = "outward", cascade = CascadeType.ALL)
    private Set<OutwardItem> outwardItem = new HashSet<>();

    private LocalDate deliveryDate;

    private String deliveredTo;

    private String billCheckedBy;

    private String destination;

    double billValue;

    @Column(unique = true)
    @GeneratedValue(strategy = GenerationType.AUTO)
    long billNumber;

    public Outward(Godown godown, Set<OutwardItem> outwardItem, LocalDate deliveryDate, String deliveredTo, String billCheckedBy, String destination, double billValue) {
        this.godown = godown;
        this.outwardItem = outwardItem;
        this.deliveryDate = deliveryDate;
        this.deliveredTo = deliveredTo;
        this.billCheckedBy = billCheckedBy;
        this.destination = destination;
        this.billValue = billValue;
    }

}
