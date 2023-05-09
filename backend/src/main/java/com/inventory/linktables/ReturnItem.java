package com.inventory.linktables;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inventory.JsonCustomizer.ReturnItemId;
import com.inventory.entities.Items;
import com.inventory.entities.Returns;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class ReturnItem {

    @EmbeddedId
    ReturnItemId id = new ReturnItemId();


    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("returnId")
    @JsonIgnore
    private Returns returns;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemId")
    @JsonIgnore
    private Items item;

    private int quantity;
}
