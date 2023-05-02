package com.inventory.linktables;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inventory.embeddable.GodownItemId;
import com.inventory.entities.Godown;
import com.inventory.entities.Items;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class GodownItem {
    
	@EmbeddedId
	GodownItemId id = new GodownItemId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("godownId")
    @JsonIgnore
    private Godown godown;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemId")
    @JsonIgnore
    private Items item;

    private int quantity;
}
