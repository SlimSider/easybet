package edu.slimsider.easybet.model.match;

import edu.slimsider.easybet.model.Event;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@DiscriminatorValue("Baseball")
public class BaseballMatch extends Match {

    @Column
    private int final_home_score;

    @Column
    private int final_away_score;

    public BaseballMatch(String home, String away, String competition, Date date, boolean active, Set<Event> events, String sport, int final_home_score, int final_away_score) {
        super(home, away, competition, date, active, events, sport);
        this.final_home_score = final_home_score;
        this.final_away_score = final_away_score;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BaseballMatch)) return false;
        if (!super.equals(o)) return false;
        BaseballMatch that = (BaseballMatch) o;
        return final_home_score == that.final_home_score &&
                final_away_score == that.final_away_score;
    }

    @Override
    public int hashCode() {

        return Objects.hash(super.hashCode(), final_home_score, final_away_score);
    }

    public BaseballMatch() { }

    public int getFinal_home_score() {
        return final_home_score;
    }

    public void setFinal_home_score(int final_home_score) {
        this.final_home_score = final_home_score;
    }

    public int getFinal_away_score() {
        return final_away_score;
    }

    public void setFinal_away_score(int final_away_score) {
        this.final_away_score = final_away_score;
    }
}
