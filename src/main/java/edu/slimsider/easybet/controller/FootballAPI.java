package edu.slimsider.easybet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.slimsider.easybet.service.FootballService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@RestController
@RequestMapping("/data")
public class FootballAPI {
    
    @Autowired
    FootballService footballService;

    @GetMapping("/fixtures")
    public String getData() {
        try {
            return footballService.getData();
        } catch(Exception e) {}
        return "";
    }
}