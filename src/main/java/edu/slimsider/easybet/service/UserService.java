package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.Bet;
import edu.slimsider.easybet.model.User;
import edu.slimsider.easybet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BetService betService;

    public User createUser(User newUser) {
        return userRepository.save(newUser);
    }

    public Iterable<User> getAll() {
        return userRepository.findAll();
    }

    public User deleteUser(long id) {
        User user = getUser(id);
        userRepository.delete(id);
        return user;
    }

    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    public User getUser(long id) {
        return this.userRepository.findOne(id);
    }

    public User updateUser(User user) {
        return createUser(user);
    }

    public void resetUserBalance(Bet bet) {
        for(User u : getAll()) {
            if(u.getBets().contains(bet)) {
                u.setBalance(u.getBalance() + bet.getStake());
                u.getBets().remove(bet);
                betService.deleteBet(bet.getId());
                updateUser(u);
                break;
            }
        }
    }

    public void payOut(Bet b) {
        for(User u : getAll()) {
            if(u.getBets().contains(b)) {
                u.setBalance(u.getBalance() + (b.getOdds() * b.getStake()));
                updateUser(u);
                break;
            }
        }
    }
}
