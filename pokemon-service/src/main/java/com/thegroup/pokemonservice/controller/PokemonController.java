package com.thegroup.pokemonservice.controller;

import com.thegroup.pokemonservice.client.MoveClient;
import com.thegroup.pokemonservice.data.PokemonDao;
import com.thegroup.pokemonservice.models.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JCircuitBreaker;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JCircuitBreakerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {
    private final PokemonDao pokemonDao;
    private final MoveClient moveClient;
    private final Resilience4JCircuitBreakerFactory circuitBreakerFactory;

    @Autowired
    public PokemonController(PokemonDao pokemonDao, MoveClient moveClient, Resilience4JCircuitBreakerFactory circuitBreakerFactory) {
        this.pokemonDao = pokemonDao;
        this.moveClient = moveClient;
        this.circuitBreakerFactory = circuitBreakerFactory;
    }

    @GetMapping(value = "/{id}", produces = {"application/json"})
    @ResponseBody
    public Pokemon getPokemonById(@PathVariable("id") Long id) {
        return pokemonDao.findById(id).orElse(null);
    }

    @GetMapping(value = "/all", produces = {"application/json"})
    @ResponseBody
    @CrossOrigin(origins = {"http://localhost:4200"})
    public List<Pokemon> getAllPokemon() {
        return pokemonDao.findAll();
    }

    @GetMapping("/validmove/{pokemonName}/{moveName}")
    public Boolean isValidMove(@PathVariable String pokemonName, @PathVariable String moveName) {
        final Resilience4JCircuitBreaker circuitBreaker = circuitBreakerFactory.create("moves");
        return circuitBreaker.run(() -> moveClient.isValidMove(pokemonName, moveName),
                throwable -> false);
    }

    @PostMapping("/new")
    public void addPokemon(@RequestBody Pokemon pokemon) {
        pokemonDao.save(pokemon);
    }
}
