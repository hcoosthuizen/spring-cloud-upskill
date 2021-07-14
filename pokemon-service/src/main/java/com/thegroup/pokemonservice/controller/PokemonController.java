package com.thegroup.pokemonservice.controller;

import com.thegroup.pokemonservice.data.PokemonDao;
import com.thegroup.pokemonservice.models.Pokemon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pokemon")
public class PokemonController {
    private final PokemonDao pokemonDao;

    @Autowired
    public PokemonController(PokemonDao pokemonDao) {
        this.pokemonDao = pokemonDao;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Pokemon getPokemonById(@PathVariable("id") Long id) {
        return pokemonDao.findById(id).orElse(null);
    }

    @GetMapping("/all")
    @ResponseBody
    public List<Pokemon> getAllPokemon() {
        return pokemonDao.findAll();
    }

    @PostMapping("/new")
    public void addPokemon(@RequestBody Pokemon pokemon) {
        pokemonDao.save(pokemon);
    }
}
