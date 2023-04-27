package com.inventory.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inventory.embeddable.GodownItemId;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
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
