package edu.slimsider.easybet.model.match;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import edu.slimsider.easybet.model.Event;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "`match`",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"home", "away", "date"})}
        )
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING, name = "Type")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "sport")
@JsonSubTypes(
        {@JsonSubTypes.Type(value = FootballMatch.class, name = "Football"),
                @JsonSubTypes.Type(value = BasketballMatch.class, name = "Basketball"),
                @JsonSubTypes.Type(value = HockeyMatch.class, name = "Hockey"),
                @JsonSubTypes.Type(value = BaseballMatch.class, name = "Baseball"),
                @JsonSubTypes.Type(value = RugbyMatch.class, name = "Rugby")
        })
public abstract class Match {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String home;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Match)) return false;
        Match match = (Match) o;
        return Objects.equals(id, match.id) &&
                Objects.equals(home, match.home) &&
                Objects.equals(away, match.away) &&
                Objects.equals(competition, match.competition) &&
                Objects.equals(date, match.date) &&
                Objects.equals(active, match.active) &&
                Objects.equals(events, match.events) &&
                Objects.equals(sport, match.sport);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, home, away, competition, date, active, events, sport);
    }

    @Column
    private String away;

    @Column
    private String competition;

    @Column
    private Date date;

    @Column
    private boolean active;

    @Column
    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "match_id", referencedColumnName = "id")
    private Set<Event> events;

    @Column(name = "Type", insertable = false, updatable = false)
    private String sport;

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getCompetition() {
        return competition;
    }

    public void setCompetition(String competition) {
        this.competition = competition;
    }

    public Match(String home, String away, String competition, Date date, boolean active, Set<Event> events, String sport) {
        this.home = home;
        this.away = away;
        this.competition = competition;
        this.date = date;
        this.active = active;
        this.events = events;
        this.sport = sport;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Match() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHome() {
        return home;
    }

    public void setHome(String home) {
        this.home = home;
    }

    public String getAway() {
        return away;
    }

    public void setAway(String away) {
        this.away = away;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
