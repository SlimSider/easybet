package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.Bet;
import edu.slimsider.easybet.model.User;
import edu.slimsider.easybet.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private BetService betService;

    @Test
    public void create() {
        User user = new User();
        user.setUsername("test");
        user.setId(1l);

        BDDMockito.given(userRepository.save(user)).willReturn(user);

        Assertions.assertThat(userService.createUser(user)).isEqualTo(user);
    }

    @Test
    public void getAll() {
        User user1 = new User();
        user1.setUsername("test");

        User user2 = new User();
        user2.setUsername("new");

        List<User> users = Arrays.asList(user1, user2);

        BDDMockito.given(userRepository.findAll()).willReturn(users);

        Assertions.assertThat(userService.getAll()).isEqualTo(users);
    }

    @Test
    public void delete() {
        User user = new User();
        user.setUsername("test");
        user.setId(1l);

        BDDMockito.given(userRepository.findOne(user.getId())).willReturn(user);
        BDDMockito.given(userRepository.exists(user.getId())).willReturn(false);

        Assertions.assertThat(userService.deleteUser(user.getId())).isEqualTo(user);
        assertFalse(userRepository.exists(user.getId()));
    }

    @Test
    public void get() {
        User user = new User();
        user.setUsername("test");
        user.setId(1l);

        BDDMockito.given(userRepository.findOne(user.getId())).willReturn(user);

        Assertions.assertThat(userService.getUser(user.getId())).isEqualTo(user);
    }

    @Test
    public void get_username() {
        User user = new User();
        user.setUsername("test");

        BDDMockito.given(userRepository.findByUsername(user.getUsername())).willReturn(user);

        Assertions.assertThat(userService.getUser(user.getUsername())).isEqualTo(user);
    }

    @Test
    public void update() {
        User user = new User();
        user.setUsername("test");
        user.setId(1l);

        BDDMockito.given(userRepository.findOne(user.getId())).willReturn(user);

        BDDMockito.given(userRepository.save(user)).willReturn(user);
        Assertions.assertThat(userService.updateUser(user)).isEqualTo(user);
    }

    @Test
    public void resetUserBalance() {
        Bet bet = new Bet();
        bet.setStake(300);
        bet.setOdds(2);
        bet.setId(1l);

        List bets = new LinkedList();
        bets.add(bet);

        User user = new User();
        user.setBalance(100);
        user.setBets(bets);

        BDDMockito.given(userRepository.findAll()).willReturn(Arrays.asList(user));
        BDDMockito.given(betService.getBet(bet.getId())).willReturn(bet);

        userService.resetUserBalance(bet);

        assertEquals(400, user.getBalance(), 0);
    }

    @Test
    public void payOut() {
        Bet bet = new Bet();
        bet.setStake(300);
        bet.setOdds(2);
        bet.setId(1l);

        List bets = new LinkedList();
        bets.add(bet);

        User user = new User();
        user.setBalance(100);
        user.setBets(bets);

        BDDMockito.given(userRepository.findAll()).willReturn(Arrays.asList(user));

        userService.payOut(bet);

        assertEquals(700, user.getBalance(), 0);
    }
}