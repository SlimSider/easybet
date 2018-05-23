package edu.slimsider.easybet.util.sportsdb;

import edu.slimsider.easybet.model.match.Match;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
public class SportsDbComponent {

    public Iterable<Match> getAllSelectable(String date, String sport) {
        URL url;
        HttpURLConnection con;
        BufferedReader in = null;
        StringBuffer response = new StringBuffer();
        String page = "https://www.thesportsdb.com/api/v1/json/1/eventsday.php?d=" + date +"&s="+ sport;
        try {
            url = new URL(page);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String input;

            while ((input = in.readLine()) != null) {
                response.append(input);
            }

        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
            return SportsDbParser.parseByJson(response.toString(), sport);
        }
}
