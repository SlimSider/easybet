package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.Bet;
import edu.slimsider.easybet.repository.BetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BetService {

    @Autowired
    private BetRepository betRepository;

    public Iterable<Bet> getAll() {
        return betRepository.findAll();
    }

    public Bet createBet(Bet bet) {
        return betRepository.save(bet);
    }

    public Bet getBet(long id) { return betRepository.findOne(id); }

    public Bet deleteBet(long id) {
        Bet bet = betRepository.findOne(id);
        betRepository.delete(id);
        return bet;
    }

    public Bet updateBet(Bet bet) {
        return createBet(bet);
    }
}
