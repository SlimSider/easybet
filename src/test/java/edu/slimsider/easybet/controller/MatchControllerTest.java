package edu.slimsider.easybet.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.slimsider.easybet.model.match.FootballMatch;
import edu.slimsider.easybet.model.match.Match;
import edu.slimsider.easybet.service.MatchService;
import edu.slimsider.easybet.util.sportsdb.SportsDbComponent;
import org.hamcrest.collection.IsCollectionWithSize;
import org.hamcrest.core.Is;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.text.SimpleDateFormat;
import java.util.*;

@RunWith(SpringRunner.class)
@WebMvcTest(value = MatchController.class, secure = false)
public class MatchControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MatchService matchService;
    
    @Test
    public void getAll() throws Exception {
        Match match = new FootballMatch();
        match.setHome("Barcelona");

        List<Match> matches = Arrays.asList(match);

        BDDMockito.given(matchService.getAll()).willReturn(matches);

        mockMvc.perform(MockMvcRequestBuilders.get("/match/get_all")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$", IsCollectionWithSize.hasSize(1)))
                .andExpect(jsonPath("$[0].home", Is.is("Barcelona")));
    }

    @Test
    public void getAllSelectable() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String date = sdf.format(new Date());

        mockMvc.perform(MockMvcRequestBuilders.get("/match/get_all_selectable?date="+date+"&sport=Football")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void get() throws Exception {
        Match match = new FootballMatch();
        match.setHome("Barcelona");
        match.setId(1l);

        BDDMockito.given(matchService.getMatch(match.getId())).willReturn(match);

        mockMvc.perform(MockMvcRequestBuilders.get("/match/get/"+match.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.home", Is.is("Barcelona")))
                .andExpect(jsonPath("$.id", Is.is(1)));
    }

    @Test
    public void create() throws Exception {
        Match match = new FootballMatch();
        match.setId(1l);
        match.setHome("Barcelona");

        BDDMockito.given(matchService.createMatch(match)).willReturn(match);

        mockMvc.perform(MockMvcRequestBuilders.post("/match/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapToJson(match)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.home", Is.is("Barcelona")));
    }

    @Test
    public void delete() throws Exception {
        Match match = new FootballMatch();
        match.setId(1l);
        match.setHome("Barcelona");

        BDDMockito.given(matchService.deleteMatch(match.getId())).willReturn(match);

        mockMvc.perform(MockMvcRequestBuilders.delete("/match/delete_match/" + match.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.home", Is.is("Barcelona")));
    }

    @Test
    public void update() throws Exception {
        Match match = new FootballMatch();
        match.setHome("Barcelona");
        match.setId(1l);

        BDDMockito.given(matchService.updateMatch(match)).willReturn(match);

        mockMvc.perform(put("/match/update_match")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapToJson(match)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(jsonPath("$.home", Is.is("Barcelona")));
    }

    private String mapToJson(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}