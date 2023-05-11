package com.inventory.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long supplierId;

    String supplierName;
    String email;
    long phone;
    String address;

}
