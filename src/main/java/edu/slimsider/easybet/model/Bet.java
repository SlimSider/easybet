package edu.slimsider.easybet.model;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "bet")
public class Bet {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private double stake;

    @Column
    private double odds;

    @Column
    private boolean won;

    @Column
    private boolean active;

    @Column
    @ManyToMany
    @JoinTable(
            name = "events_bets",
            joinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "bet_id", referencedColumnName = "id")
    )
    private Set<Event> events;

    @Column
    @ElementCollection
    private List<String> choices;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getStake() {
        return stake;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public List<String> getChoices() {
        return choices;
    }

    public void setChoices(List<String> choices) {
        this.choices = choices;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Bet)) return false;
        Bet bet = (Bet) o;
        return Double.compare(bet.stake, stake) == 0 &&
                Double.compare(bet.odds, odds) == 0 &&
                won == bet.won &&
                active == bet.active &&
                Objects.equals(id, bet.id) &&
                Objects.equals(events, bet.events) &&
                Objects.equals(choices, bet.choices);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, stake, odds, won, active, events, choices);
    }

    public boolean isActive() {

        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setStake(double stake) {
        this.stake = stake;
    }

    public double getOdds() {
        return odds;
    }

    public void setOdds(double odds) {
        this.odds = odds;
    }

    public boolean isWon() {
        return won;
    }

    public void setWon(boolean won) {
        this.won = won;
    }

    public Bet(double stake,double odds, boolean won, Set<Event> events, List<String> choices) {
        this.stake = stake;
        this.odds = odds;
        this.won = won;
        this.events = events;
        this.choices = choices;
    }

    public Bet() {}

}
