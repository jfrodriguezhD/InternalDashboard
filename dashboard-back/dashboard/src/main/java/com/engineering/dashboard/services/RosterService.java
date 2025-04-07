package com.engineering.dashboard.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.engineering.dashboard.entities.RosterEntity;
import com.engineering.dashboard.repositories.RosterRepository;

import jakarta.validation.Valid;

@Service
public class RosterService {
	@Autowired
    private RosterRepository rosterRepository;

    public ResponseEntity<List<RosterEntity>> getAllRosters() {
        List<RosterEntity> rosters = rosterRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(rosters);
    }

    public ResponseEntity<RosterEntity> createRoster(@Valid @RequestBody RosterEntity roster) {
        roster.setLastModified(LocalDateTime.now());
        roster.setCreatedTime(LocalDateTime.now());
        rosterRepository.save(roster);
        return ResponseEntity.status(HttpStatus.OK).body(roster);
    }

    public ResponseEntity<RosterEntity> getRoster(Long id) {
        Optional<RosterEntity> roster = rosterRepository.findById(id);

        if (roster.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(roster.get());
    }

    public ResponseEntity<RosterEntity> updateRoster(Long rostersId, @Valid @RequestBody RosterEntity roster) {
        Optional<RosterEntity> oldRoster = rosterRepository.findById(rostersId);

        if(oldRoster.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        roster.setLastModified(LocalDateTime.now());
        roster.setId(rostersId);
        rosterRepository.save(roster);
        return ResponseEntity.status(HttpStatus.OK).body(roster);
    }

    public ResponseEntity<RosterEntity> deleteRoster(Long rosterId) {
        Optional<RosterEntity> roster = rosterRepository.findById(rosterId);

        if(roster.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        rosterRepository.delete(roster.get());
        return ResponseEntity.status(HttpStatus.OK).body(roster.get());
    }
}
