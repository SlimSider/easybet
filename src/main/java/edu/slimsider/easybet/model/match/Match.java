package edu.slimsider.easybet.model.match;

import edu.slimsider.easybet.model.Event;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "`match`")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING, name = "Type")
public abstract class Match {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String home;

    @Column
    private String away;

    @Column
    private Date date;

    @Column
    private boolean status;

    @Column
    @OneToMany
    @JoinColumn(name = "event_id", referencedColumnName = "id")
    private Set<Event> events;

    public Match(String home, String away, Date date, boolean status, Set<Event> events) {
        this.home = home;
        this.away = away;
        this.date = date;
        this.status = status;
        this.events = events;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Match() { }

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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
