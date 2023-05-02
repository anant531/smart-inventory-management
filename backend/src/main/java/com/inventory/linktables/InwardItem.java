package com.inventory.linktables;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inventory.embeddable.InwardItemId;
import com.inventory.entities.Inward;
import com.inventory.entities.Items;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class InwardItem {
    @EmbeddedId
    InwardItemId id = new InwardItemId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("inwardId")
    @JsonIgnore
    private Inward inward;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemId")
    @JsonIgnore
    private Items item;

    private int quantity;


}
