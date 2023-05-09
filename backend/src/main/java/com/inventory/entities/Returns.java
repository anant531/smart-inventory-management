package com.inventory.entities;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.inventory.JsonCustomizer.ReturnsDeserializer;
import com.inventory.JsonCustomizer.ReturnsSerializer;
import com.inventory.linktables.ReturnItem;
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
@ToString
@JsonSerialize(using = ReturnsSerializer.class)
@JsonDeserialize(using = ReturnsDeserializer.class)
public class Returns {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long returnId;

    String address;

    long billNumber;
    long billValue;

    LocalDateTime dateOfReturn;

    String reason;

    @OneToMany(mappedBy = "returns", cascade = CascadeType.ALL)
    Set<ReturnItem> returnItem = new HashSet<>();

    public Returns(String address, long billNumber, long billValue, LocalDateTime dateOfReturn, String reason, Set<ReturnItem> returnItem) {
        this.address = address;
        this.billNumber = billNumber;
        this.billValue = billValue;
        this.dateOfReturn = dateOfReturn;
        this.reason = reason;
        this.returnItem = returnItem;
    }
}
