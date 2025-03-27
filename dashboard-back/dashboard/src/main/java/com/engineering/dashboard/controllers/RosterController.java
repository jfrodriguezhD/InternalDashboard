package com.engineering.dashboard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.engineering.dashboard.entities.RosterEntity;
import com.engineering.dashboard.services.RosterService;

@RestController
@RequestMapping("/api/v1/roster")
public class RosterController {
@Autowired
    RosterService rosterService;

    @GetMapping("/")
    public ResponseEntity<List<RosterEntity>> getRosters() {
        return rosterService.getAllRosters();
    }

    @PostMapping("/")
    public ResponseEntity<RosterEntity> postRoster(@RequestBody RosterEntity roster) {
        return rosterService.createRoster(roster);
    }

    @GetMapping("/{rosterId}")
    public ResponseEntity<RosterEntity> getRoster(@RequestParam Long rosterId) {
        return rosterService.getRoster(rosterId);
    }

    @PutMapping("/{rosterId}")
    public ResponseEntity<RosterEntity> putRoster(@PathVariable Long rosterId, @RequestBody RosterEntity roster) {
        return rosterService.updateRoster(rosterId,roster);
    }

    @DeleteMapping("/{rosterId}")
    public ResponseEntity<RosterEntity> deleteRoster(@PathVariable Long rosterId){
        return rosterService.deleteRoster(rosterId);
    }
}
