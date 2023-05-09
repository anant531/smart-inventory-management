package com.inventory.entities;


import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class Supplier{


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long supplierId;

    String supplierName;
    String address;
    String email;
    long phone;


}
