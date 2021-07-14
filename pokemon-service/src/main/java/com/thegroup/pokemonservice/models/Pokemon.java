package com.thegroup.pokemonservice.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String elementalType;
}
