package edu.slimsider.easybet.model.match;

import edu.slimsider.easybet.model.Event;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.Date;
import java.util.Set;

@Entity
@DiscriminatorValue("Football")
public class FootballMatch extends Match {

    @Column
    private int ht_home_score;

    @Column
    private int ht_away_score;

    @Column
    private int ft_home_score;

    @Column
    private int ft_away_score;

    public FootballMatch(String home, String away, Date date, boolean status, Set<Event> events, int ht_home_score, int ht_away_score, int ft_home_score, int ft_away_score) {
        super(home, away, date, status, events);
        this.ht_home_score = ht_home_score;
        this.ht_away_score = ht_away_score;
        this.ft_home_score = ft_home_score;
        this.ft_away_score = ft_away_score;
    }

    public FootballMatch() { }

    public int getHt_home_score() {
        return ht_home_score;
    }

    public void setHt_home_score(int ht_home_score) {
        this.ht_home_score = ht_home_score;
    }

    public int getHt_away_score() {
        return ht_away_score;
    }

    public void setHt_away_score(int ht_away_score) {
        this.ht_away_score = ht_away_score;
    }

    public int getFt_home_score() {
        return ft_home_score;
    }

    public void setFt_home_score(int ft_home_score) {
        this.ft_home_score = ft_home_score;
    }

    public int getFt_away_score() {
        return ft_away_score;
    }

    public void setFt_away_score(int ft_away_score) {
        this.ft_away_score = ft_away_score;
    }
}
