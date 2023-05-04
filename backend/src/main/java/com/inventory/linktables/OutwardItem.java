package com.inventory.linktables;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inventory.embeddable.InwardItemId;
import com.inventory.embeddable.OutwardItemId;
import com.inventory.entities.Inward;
import com.inventory.entities.Items;
import com.inventory.entities.Outward;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class OutwardItem {

    @EmbeddedId
    OutwardItemId id = new OutwardItemId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("outwardId")
    @JsonIgnore
    private Outward outward;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemId")
    @JsonIgnore
    private Items item;

    private int quantity;

}
