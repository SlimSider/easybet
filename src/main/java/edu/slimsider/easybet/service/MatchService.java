package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.match.Match;
import edu.slimsider.easybet.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatchService {

    @Autowired
    private MatchRepository<Match> matchRepository;

    public Iterable<Match> getAll() {
        return matchRepository.findAll();
    }

    public Match createMatch(Match match) {
        return matchRepository.save(match);
    }

    public Match deleteMatch(long id) {
        Match match = matchRepository.findOne(id);
        matchRepository.delete(id);
        return match;
    }
}
