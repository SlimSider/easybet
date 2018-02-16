package edu.slimsider.easybet.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Service;

@Service
public class FootballService {

    public String getData() throws Exception {
        URL url = new URL("http://api.football-data.org/v1/fixtures/");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();

        con.setRequestMethod("GET");
        con.setRequestProperty( "X-Auth-Token", "03ebc6f5d98d4ffa84fb1e9328399780");
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String input;
        StringBuffer response = new StringBuffer();
        while ((input = in.readLine()) != null) {
			response.append(input);
		}
        in.close();
        return response.toString();
    }
}