package com.thegroup.pokemonservice.controller;

import com.thegroup.pokemonservice.client.MoveClient;
import com.thegroup.pokemonservice.data.PokemonDao;
import com.thegroup.pokemonservice.models.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JCircuitBreaker;
import org.springframework.cloud.circuitbreaker.resilience4j.Resilience4JCircuitBreakerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(originPatterns = {"http://localhost:*"})
@RequestMapping("/pokemon")
public class PokemonController {
    private final PokemonDao pokemonDao;
    private final MoveClient moveClient;
    private final Resilience4JCircuitBreakerFactory circuitBreakerFactory;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public PokemonController(PokemonDao pokemonDao, MoveClient moveClient, Resilience4JCircuitBreakerFactory circuitBreakerFactory, SimpMessagingTemplate messagingTemplate) {
        this.pokemonDao = pokemonDao;
        this.moveClient = moveClient;
        this.circuitBreakerFactory = circuitBreakerFactory;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping(value = "/{id}", produces = {"application/json"})
    @ResponseBody
    public Pokemon getPokemonById(@PathVariable("id") Long id) {
        return pokemonDao.findById(id).orElse(null);
    }

    @GetMapping(value = "/all", produces = {"application/json"})
    @ResponseBody
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
        final Pokemon savedPokemon = pokemonDao.save(pokemon);
        this.messagingTemplate.convertAndSend("/notifications/discoveries", savedPokemon);
    }
}
