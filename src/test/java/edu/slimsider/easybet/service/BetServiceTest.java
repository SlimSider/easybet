package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.Bet;
import edu.slimsider.easybet.repository.BetRepository;
import org.assertj.core.api.Assertions;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BetServiceTest {

    @Autowired
    private BetService betService;

    @MockBean
    private BetRepository betRepository;

    @Test
    public void getAll() {
        Bet bet1 = new Bet();
        bet1.setOdds(3);
        bet1.setStake(200);

        Bet bet2 = new Bet();
        bet2.setOdds(3);
        bet2.setStake(200);

        List<Bet> bets = Arrays.asList(bet1, bet2);

        BDDMockito.given(betRepository.findAll()).willReturn(bets);

        Assertions.assertThat(betService.getAll()).isEqualTo(bets);
    }

    @Test
    public void create() {
        Bet bet = new Bet();
        bet.setOdds(3);
        bet.setStake(200);

        BDDMockito.given(betRepository.save(bet)).willReturn(bet);

        Assertions.assertThat(betService.createBet(bet)).isEqualTo(bet);
    }

    @Test
    public void get() {
        Bet bet = new Bet();
        bet.setOdds(3);
        bet.setStake(200);
        bet.setId(1l);

        BDDMockito.given(betRepository.findOne(bet.getId())).willReturn(bet);

        Assertions.assertThat(betService.getBet(bet.getId())).isEqualTo(bet);
    }

    @Test
    public void delete() {
        Bet bet = new Bet();
        bet.setOdds(3);
        bet.setStake(200);
        bet.setId(1l);

        BDDMockito.given(betRepository.findOne(bet.getId())).willReturn(bet);
        BDDMockito.given(betRepository.exists(bet.getId())).willReturn(false);

        Assertions.assertThat(betService.deleteBet(bet.getId())).isEqualTo(bet);
        Assert.assertFalse(betRepository.exists(bet.getId()));
    }

    @Test
    public void update() {
        Bet bet = new Bet();
        bet.setOdds(3);
        bet.setStake(200);
        bet.setWon(false);
        bet.setId(1l);

        BDDMockito.given(betRepository.findOne(bet.getId())).willReturn(bet);

        bet.setWon(true);
        BDDMockito.given(betRepository.save(bet)).willReturn(bet);
        Assertions.assertThat(betService.updateBet(bet)).isEqualTo(bet);
    }
}