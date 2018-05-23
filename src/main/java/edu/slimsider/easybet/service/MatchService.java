package edu.slimsider.easybet.service;

import edu.slimsider.easybet.enums.Type;
import edu.slimsider.easybet.model.Bet;
import edu.slimsider.easybet.model.Event;
import edu.slimsider.easybet.model.match.*;
import edu.slimsider.easybet.repository.MatchRepository;
import edu.slimsider.easybet.util.sportsdb.SportsDbComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

@Service
public class MatchService {

    @Autowired
    private MatchRepository<Match> matchRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private BetService betService;

    @Autowired
    private UserService userService;

    @Autowired
    private SportsDbComponent sportsDbComponent;

    public Iterable<Match> getAll() {
        return matchRepository.findAll();
    }

    public Match getMatch(long id) { return matchRepository.findOne(id); }

    public Match deleteMatch(long id) {
        Match match = matchRepository.findOne(id);
        safeDelete(match);
        matchRepository.delete(id);
        return match;
    }

    public Match updateMatch(Match match) {
        if(!match.isActive()) {
            determineMatchResult(match);
        }
        Match oldMatch = matchRepository.findOne(match.getId());
        if(match.getEvents().size() < oldMatch.getEvents().size()) {
            oldMatch.getEvents().removeAll(match.getEvents());
            safeDelete(oldMatch);
        }
        if(match.getEvents().isEmpty()) {
            matchRepository.delete(match.getId());
            return match;
        }
        return createMatch(match);
    }

    public Iterable<Match> getAllSelectable(String date, String sport) { return sportsDbComponent.getAllSelectable(date, sport); }

    public Match createMatch(Match match) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(match.getDate());
        cal.set(Calendar.HOUR_OF_DAY, 0);
        match.setDate(cal.getTime());
        return this.matchRepository.save(match);
    }

    private void determineMatchResult(Match match) {
            List<Event> betEvents;
            String result = "";
            for(Event e : match.getEvents()) {
                e.setActive(false);
                eventService.updateEvent(e);
                for(Bet b : betService.getAll()) {
                    boolean winner = true;
                    boolean end = true;
                    if(!b.isActive()) {
                        continue;
                    }
                    betEvents = new LinkedList<>(b.getEvents());
                    for (Event betEvent : betEvents) {
                        if(betEvent.isActive()) {
                            end = false;
                        }
                        if(e.equals(betEvent)) {
                            if(match instanceof FootballMatch) {
                                result = determineFootballMatch((FootballMatch) match, e);
                            } else if(match instanceof BasketballMatch) {
                                result = determineBasketballMatch((BasketballMatch)match, e);
                            } else if(match instanceof BaseballMatch) {
                                result = determineBaseballMatch((BaseballMatch)match, e);
                            } else if(match instanceof HockeyMatch) {
                                result = determineHockeyMatch((HockeyMatch)match, e);
                            } else if(match instanceof RugbyMatch) {
                                result = determineRugbyMatch((RugbyMatch)match, e);
                            }
                            if(!b.getChoices().get(betEvents.indexOf(e)).equals(result)) {
                                winner = false;
                                b.setActive(false);
                                b.setWon(false);
                                this.betService.updateBet(b);
                                break;
                            }
                        }
                    }
                    if(winner && end) {
                        b.setActive(false);
                        b.setWon(true);
                        this.betService.updateBet(b);
                        this.userService.payOut(b);
                    }
                }
            }
    }

    private String determineFootballMatch(FootballMatch match, Event e) {
        String result = "";
        result = getResult(e, result, match.getFinal_home_score(), match.getFinal_away_score(), match.getHt_home_score(), match.getHt_away_score());
        return result;
    }
    
    private String determineRugbyMatch(RugbyMatch match, Event e) {
        String result = "";
        result = getResult(e, result, match.getFinal_home_score(), match.getFinal_away_score(), 0, 0);
        return result;
    }

    private String determineBaseballMatch(BaseballMatch match, Event e) {
        String result = "";
        result = getResult(e, result, match.getFinal_home_score(), match.getFinal_away_score(), 0, 0);
        return result;
    }
    
    private String determineBasketballMatch(BasketballMatch match, Event e) {
        String result = "";
        result = getResult(e, result, match.getFinal_home_score(), match.getFinal_away_score(), match.getHt_home_score(), match.getHt_away_score());
        return result;
    }
    
    private String determineHockeyMatch(HockeyMatch match, Event e) {
        String result = "";
        result = getResult(e, result, match.getFinal_home_score(), match.getFinal_away_score(), 0, 0);
        return result;
    }

    private String getResult(Event e, String result, int final_home_score, int final_away_score, int ht_home_score, int ht_away_score) {
        if (e.getType().equals(Type.FINAL_TIME)) {
            result = getWinner(result, final_home_score, final_away_score);
        } else if (e.getType().equals(Type.HALF_TIME)) {
            result = getWinner(result, ht_home_score, ht_away_score);
        } else if (e.getType().equals(Type.UNDER_OVER)) {
            result = getWinner(result,  e.getLine(), final_home_score+final_away_score);
        }
        return result;
    }

    private String getWinner(String result, int home_score, int away_score) {
        if(home_score > away_score) {
            result = "home";
        } else if(home_score == away_score) {
            result = "draw";
        } else {
            result = "away";
        }
        return result;
    }

    private void safeDelete(Match match) {
        if(!match.getEvents().isEmpty()) {
            for(Event e : match.getEvents()) {
                eventService.deleteEvent(e.getId());
            }
        }
    }
}
