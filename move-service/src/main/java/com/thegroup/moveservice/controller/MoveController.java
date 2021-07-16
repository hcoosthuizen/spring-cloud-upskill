package com.thegroup.moveservice.controller;

import com.thegroup.moveservice.data.Moves;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/moves")
public class MoveController {

    @GetMapping("/movelist/{pokemonName}/{moveName}")
    public Boolean hasMove(@PathVariable String pokemonName, @PathVariable String moveName) {
        return Optional.ofNullable(Moves.MOVE_LIBRARY.get(pokemonName))
                .orElse(Collections.emptyList())
                .contains(moveName);
    }

    @GetMapping("/movelist/{pokemonName}")
    public List<String> getMovesFor(@PathVariable String pokemonName) {
        return Optional.ofNullable(Moves.MOVE_LIBRARY.get(pokemonName)).orElse(Collections.singletonList("Unknown"));
    }
}
