package edu.slimsider.easybet.service;

import edu.slimsider.easybet.model.Event;
import edu.slimsider.easybet.repository.EventRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertFalse;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EventServiceTest {

    @Autowired
    private EventService eventService;

    @MockBean
    private EventRepository eventRepository;

    @Test
    public void getAll() {
        Event event1 = new Event();
        event1.setHomeOdds(3);

        Event event2 = new Event();
        event2.setHomeOdds(6);

        List<Event> events = Arrays.asList(event1, event2);

        BDDMockito.given(eventRepository.findAll()).willReturn(events);

        Assertions.assertThat(eventService.getAll()).isEqualTo(events);
    }

    @Test
    public void create() {
        Event event = new Event();
        event.setHomeOdds(3);
        event.setId(1l);

        BDDMockito.given(eventRepository.save(event)).willReturn(event);

        Assertions.assertThat(eventService.createEvent(event)).isEqualTo(event);
    }

    @Test
    public void get() {
        Event event = new Event();
        event.setHomeOdds(3);
        event.setId(1l);

        BDDMockito.given(eventRepository.findOne(event.getId())).willReturn(event);

        Assertions.assertThat(eventService.getEvent(event.getId())).isEqualTo(event);
    }

    @Test
    public void delete() {
        Event event = new Event();
        event.setHomeOdds(3);
        event.setId(1l);

        BDDMockito.given(eventRepository.findOne(event.getId())).willReturn(event);
        BDDMockito.given(eventRepository.exists(event.getId())).willReturn(false);

        Assertions.assertThat(eventService.deleteEvent(event.getId())).isEqualTo(event);
        assertFalse(eventRepository.exists(event.getId()));
    }

    @Test
    public void update() {
        Event event = new Event();
        event.setHomeOdds(3);
        event.setActive(true);
        event.setId(1l);

        BDDMockito.given(eventRepository.findOne(event.getId())).willReturn(event);

        event.setActive(false);
        BDDMockito.given(eventRepository.save(event)).willReturn(event);
        Assertions.assertThat(eventService.updateEvent(event)).isEqualTo(event);
    }
}