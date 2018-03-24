package edu.slimsider.easybet.model;


import javax.persistence.*;

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
    private boolean status;

    @Column
    private String type;

    public Event() { }

    public Event(double homeOdds, double drawOdds, double awayOdds, boolean status, String type) {
        this.homeOdds = homeOdds;
        this.drawOdds = drawOdds;
        this.awayOdds = awayOdds;
        this.status = status;
        this.type = type;
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
