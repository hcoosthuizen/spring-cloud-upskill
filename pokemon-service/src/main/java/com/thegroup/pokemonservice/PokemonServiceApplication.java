package com.thegroup.pokemonservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableDiscoveryClient
@EnableJpaRepositories("com.thegroup.pokemonservice.data")
@EnableFeignClients("com.thegroup.pokemonservice.client")
public class PokemonServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PokemonServiceApplication.class, args);
    }
}
