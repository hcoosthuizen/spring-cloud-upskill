package com.thegroup.pokemonservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.thegroup.pokemonservice.data")
public class PokemonServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PokemonServiceApplication.class, args);
    }
}
