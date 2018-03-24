package edu.slimsider.easybet.controller;

import edu.slimsider.easybet.model.match.Match;
import edu.slimsider.easybet.service.MatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController("/match")
public class MatchAPI {

    @Autowired
    private MatchService matchService;

    @GetMapping("/get_all")
    public ResponseEntity<Iterable<Match>> getAll() {
        return ResponseEntity.ok(matchService.getAll());
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    @PostMapping("/add")
    public ResponseEntity<Match> create(@RequestBody Match match) {
        return ResponseEntity.ok(matchService.createMatch(match));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'MANAGER')")
    @DeleteMapping("/admin/delete_user/{id}")
    public ResponseEntity<Match> delete(@PathVariable("id") long id) {
        return ResponseEntity.ok(matchService.deleteMatch(id));
    }
}
