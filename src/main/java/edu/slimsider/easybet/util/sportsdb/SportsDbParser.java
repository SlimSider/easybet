package edu.slimsider.easybet.util.sportsdb;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import edu.slimsider.easybet.exceptions.NoMatchFoundException;
import edu.slimsider.easybet.model.match.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

public class SportsDbParser {

    public static Iterable<Match> parseByJson(String in, String sport) {

        List<Match> parsedMatches = new LinkedList<>();
        JsonParser parser = new JsonParser();
        try {
            JsonElement root = parser.parse(in).getAsJsonObject().getAsJsonArray("events");
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            for(JsonElement item : root.getAsJsonArray()) {
                JsonObject object = item.getAsJsonObject();
                if(sport.equals("Soccer")) {
                    parsedMatches.add(new FootballMatch(object.get("strHomeTeam").getAsString(), object.get("strAwayTeam").getAsString(),
                        object.get("strLeague").getAsString(), sdf.parse(object.get("dateEvent").getAsString()), true,
                        new HashSet<>(), "Football", 0, 0, 0, 0));
                } else if(sport.equals("Basketball")) {
                    parsedMatches.add(new BasketballMatch(object.get("strHomeTeam").getAsString(), object.get("strAwayTeam").getAsString(),
                            object.get("strLeague").getAsString(), sdf.parse(object.get("dateEvent").getAsString()), true,
                            new HashSet<>(), sport, 0, 0, 0, 0));
                } else if(sport.equals("Hockey")) {
                    parsedMatches.add(new HockeyMatch(object.get("strHomeTeam").getAsString(), object.get("strAwayTeam").getAsString(),
                            object.get("strLeague").getAsString(), sdf.parse(object.get("dateEvent").getAsString()), true,
                            new HashSet<>(), sport, 0, 0));
                } else if(sport.equals("Baseball")) {
                    parsedMatches.add(new BaseballMatch(object.get("strHomeTeam").getAsString(), object.get("strAwayTeam").getAsString(),
                            object.get("strLeague").getAsString(), sdf.parse(object.get("dateEvent").getAsString()), true,
                            new HashSet<>(), sport, 0, 0));
                } else if(sport.equals("Rugby")) {
                    parsedMatches.add(new RugbyMatch(object.get("strHomeTeam").getAsString(), object.get("strAwayTeam").getAsString(),
                            object.get("strLeague").getAsString(), sdf.parse(object.get("dateEvent").getAsString()), true,
                            new HashSet<>(), sport, 0, 0));
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (ClassCastException ue) {
            throw new NoMatchFoundException("Couldn't find any match with these parameters");
        }
        return parsedMatches;
    }
}
