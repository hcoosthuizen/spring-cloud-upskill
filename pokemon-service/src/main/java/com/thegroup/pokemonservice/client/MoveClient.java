package com.thegroup.pokemonservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "move-service")
public interface MoveClient {
    @GetMapping("/moves/movelist/{pokemonName}")
    List<String> getMoveList(@PathVariable String pokemonName);
    @GetMapping("/moves/movelist/{pokemonName}/{moveName}")
    Boolean isValidMove(@PathVariable String pokemonName, @PathVariable String moveName);
}
