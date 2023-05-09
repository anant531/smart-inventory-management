package com.inventory.JsonCustomizer;

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
public class InwardItemId implements Serializable {


    @Column(name = "inward_id")
    private Long inwardId;

    @Column(name = "item_id")
    private Long itemId;

}
