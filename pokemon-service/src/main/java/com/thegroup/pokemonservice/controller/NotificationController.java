package com.thegroup.pokemonservice.controller;

import com.thegroup.pokemonservice.models.Pokemon;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    @MessageMapping("/new")
    @Payload
    @SendTo("/notifications/discoveries")
    public Pokemon newDiscovery(Pokemon pokemon) {
        return pokemon;
    }
}
