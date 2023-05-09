package com.inventory.JsonCustomizer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GodownItemId implements Serializable{
	
	Long godownId;
	
	Long itemId;

//	public GodownItemId(Long godownId, Long itemId) {
//		this.godownId = godownId;
//		this.itemId = itemId;
//	}
}
