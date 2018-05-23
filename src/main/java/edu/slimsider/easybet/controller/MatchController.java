package edu.slimsider.easybet.controller;

import edu.slimsider.easybet.exceptions.IllegalPersistanceException;
import edu.slimsider.easybet.exceptions.NoMatchFoundException;
import edu.slimsider.easybet.model.match.Match;
import edu.slimsider.easybet.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/match")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER', 'PLAYER')")
    @GetMapping("/get_all")
    public ResponseEntity<Iterable<Match>> getAll() {
        return ResponseEntity.ok(matchService.getAll());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    @GetMapping("/get_all_selectable")
    public ResponseEntity<Iterable<Match>> getAllSelectable(@RequestParam(value="date") String date, @RequestParam(value="sport") String sport) {
        try {
            return ResponseEntity.ok(matchService.getAllSelectable(date, sport));
        } catch (Exception e) {
            throw new NoMatchFoundException("Couldn't find any match with these parameters");
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER', 'PLAYER')")
    @GetMapping("/get/{id}")
    public ResponseEntity<Match> getMatch(@PathVariable("id") long id) {
        return ResponseEntity.ok(matchService.getMatch(id));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    @PostMapping("/add")
    public ResponseEntity<Match> create(@RequestBody Match match) {
        try {
            return ResponseEntity.ok(matchService.createMatch(match));
        } catch (Exception e) {
            throw new IllegalPersistanceException("This match has been already added");
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    @DeleteMapping("/delete_match/{id}")
    public ResponseEntity<Match> delete(@PathVariable("id") long id) {
        return ResponseEntity.ok(matchService.deleteMatch(id));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    @PutMapping("/update_match")
    public ResponseEntity<Match> update(@RequestBody Match match) {
        try {
            if(matchService.getMatch(match.getId()) != null) {
                return ResponseEntity.ok(matchService.updateMatch(match));
            } else {
                return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().build().toUri()).body(matchService.updateMatch(match));
            }
        } catch (Exception e) {
            throw new IllegalPersistanceException("This match has been already added");
        }
    }
}
