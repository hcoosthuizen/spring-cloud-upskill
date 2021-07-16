package com.thegroup.moveservice.data;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class Moves {
    public static final Map<String, List<String>> MOVE_LIBRARY = new HashMap<>();

    static {
        MOVE_LIBRARY.put("Dratini", Arrays.asList("Tackle", "Hyper Beam", "Ice Beam", "Protect"));
        MOVE_LIBRARY.put("Moltres", Arrays.asList("Ember", "Fly", "Flamethrower", "Overheat"));
        MOVE_LIBRARY.put("Mewtwo", Arrays.asList("Psychic", "Psybeam", "Protect", "Substitute"));
    }
}
