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
public class ReturnItemId implements Serializable {

    @Column(name = "return_id")
    private Long returnId;

    @Column(name = "item_id")
    private Long itemId;
}
