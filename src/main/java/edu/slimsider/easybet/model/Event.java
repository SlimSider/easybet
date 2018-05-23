package edu.slimsider.easybet.model;


import edu.slimsider.easybet.enums.Type;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "`event`")
public class Event {

    @Column
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private double homeOdds;

    @Column
    private double drawOdds;

    @Column
    private double awayOdds;

    @Column
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column
    private int line;

    @Column
    private boolean active;

    public Event() { }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Event(double homeOdds, double drawOdds, double awayOdds, Type type, boolean active, int line) {
        this.homeOdds = homeOdds;
        this.drawOdds = drawOdds;
        this.awayOdds = awayOdds;
        this.type = type;
        this.line = line;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getHomeOdds() {
        return homeOdds;
    }

    public void setHomeOdds(double homeOdds) {
        this.homeOdds = homeOdds;
    }

    public double getDrawOdds() {
        return drawOdds;
    }

    public void setDrawOdds(double drawOdds) {
        this.drawOdds = drawOdds;
    }

    public double getAwayOdds() {
        return awayOdds;
    }

    public void setAwayOdds(double awayOdds) {
        this.awayOdds = awayOdds;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Event)) return false;
        Event event = (Event) o;
        return Double.compare(event.homeOdds, homeOdds) == 0 &&
                Double.compare(event.drawOdds, drawOdds) == 0 &&
                Double.compare(event.awayOdds, awayOdds) == 0 &&
                Integer.compare(event.line, line) == 0 &&
                Objects.equals(id, event.id) &&
                Objects.equals(type, event.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, homeOdds, drawOdds, awayOdds, type, line);
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public int getLine() {
        return line;
    }

    public void setLine(int line) {
        this.line = line;
    }

}
