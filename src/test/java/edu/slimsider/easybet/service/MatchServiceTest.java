package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.Event;
import edu.slimsider.easybet.model.match.FootballMatch;
import edu.slimsider.easybet.model.match.Match;
import edu.slimsider.easybet.repository.MatchRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MatchServiceTest {

    @Autowired
    private MatchService matchService;

    @MockBean
    private MatchRepository matchRepository;

    @Test
    public void getAll() {
        Match match1 = new FootballMatch();
        match1.setHome("Barcelona");

        Match match2 = new FootballMatch();
        match2.setAway("Liverpool");

        List<Match> matchs = Arrays.asList(match1, match2);

        BDDMockito.given(matchRepository.findAll()).willReturn(matchs);

        Assertions.assertThat(matchService.getAll()).isEqualTo(matchs);
    }

    @Test
    public void get() {
        Match match = new FootballMatch();
        match.setHome("Barcelona");
        match.setId(1l);

        BDDMockito.given(matchRepository.findOne(match.getId())).willReturn(match);

        Assertions.assertThat(matchService.getMatch(match.getId())).isEqualTo(match);
    }

    @Test
    public void delete() {
        Match match = new FootballMatch();
        match.setHome("Barcelona");
        match.setId(1l);
        match.setEvents(new HashSet<>());

        BDDMockito.given(matchRepository.findOne(match.getId())).willReturn(match);
        BDDMockito.given(matchRepository.exists(match.getId())).willReturn(false);

        Assertions.assertThat(matchService.deleteMatch(match.getId())).isEqualTo(match);
        assertFalse(matchRepository.exists(match.getId()));
    }

    @Test
    public void update() {
        Match match = new FootballMatch();
        match.setHome("Barcelona");
        match.setActive(true);
        match.setDate(new Date());
        match.setId(1l);
        Event event = new Event();
        event.setId(1l);
        match.setEvents(new HashSet() {{add(event);}});

        BDDMockito.given(matchRepository.findOne(match.getId())).willReturn(match);

        match.setHome("Boston Celtics");
        BDDMockito.given(matchRepository.save(match)).willReturn(match);
        Assertions.assertThat(matchService.updateMatch(match)).isEqualTo(match);
    }

    @Test
    public void create() {
        Match match = new FootballMatch();
        match.setHome("Barcelona");
        match.setDate(new Date());
        match.setId(1l);

        BDDMockito.given(matchRepository.save(match)).willReturn(match);

        Assertions.assertThat(matchService.createMatch(match)).isEqualTo(match);
    }
}