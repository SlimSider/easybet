package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.Bet;
import edu.slimsider.easybet.model.Event;
import edu.slimsider.easybet.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private BetService betService;

    @Autowired
    private UserService userService;

    public Iterable<Event> getAll() {
        return eventRepository.findAll();
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event getEvent(long id) { return eventRepository.findOne(id); }

    public Event deleteEvent(long id) {
        Event event = eventRepository.findOne(id);
        deleteFromBet(event);
        eventRepository.delete(id);
        return event;
    }

    public Event updateEvent(Event event) {
        return createEvent(event);
    }

    private void deleteFromBet(Event event) {
        Iterator<Event> eventIterator;
        List choices;
        double removeOdds;
        for(Bet b : betService.getAll()) {
            choices = new LinkedList(b.getEvents());
            eventIterator = b.getEvents().iterator();
            while(eventIterator.hasNext()) {
                Event e = eventIterator.next();
                if(event.equals(e)) {
                    if(b.getChoices().get(choices.indexOf(e)).equals("home")) {
                        removeOdds = e.getHomeOdds();
                    } else if(b.getChoices().get(choices.indexOf(e)).equals("draw")) {
                        removeOdds = e.getDrawOdds();
                    } else {
                        removeOdds = e.getAwayOdds();
                    }
                    b.getChoices().remove(choices.indexOf(e));
                    b.setOdds(b.getOdds() / removeOdds);
                    eventIterator.remove();
                }
            }
            if(b.getEvents().isEmpty()) {
                userService.resetUserBalance(b);
            } else {
                betService.updateBet(b);
            }
        }
    }
}
