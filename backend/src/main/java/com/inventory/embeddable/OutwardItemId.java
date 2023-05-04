package com.inventory.embeddable;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class OutwardItemId implements Serializable {


    @Column(name = "outward_id")
    private Long outwardId;

    @Column(name = "item_id")
    private Long itemId;

//    public OutwardItemId(Long outwardId, Long itemId) {
//        this.outwardId = outwardId;
//        this.itemId = itemId;
//    }

}
