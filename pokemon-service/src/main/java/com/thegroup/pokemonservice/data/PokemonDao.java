package com.thegroup.pokemonservice.data;

import com.thegroup.pokemonservice.models.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PokemonDao extends JpaRepository<Pokemon, Long> {
    Optional<Pokemon> findByName(String name);
    Optional<Pokemon> findByElementalType(String element);
}
