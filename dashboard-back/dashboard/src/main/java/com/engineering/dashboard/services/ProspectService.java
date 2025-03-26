package com.engineering.dashboard.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.engineering.dashboard.entities.ProspectEntity;
import com.engineering.dashboard.repositories.ProspectRepository;

import jakarta.validation.Valid;

@Service
public class ProspectService {
	@Autowired
    private ProspectRepository prospectRepository;

    public ResponseEntity<List<ProspectEntity>> getAllProspects() {
        List<ProspectEntity> prospects = prospectRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(prospects);
    }

    public ResponseEntity<ProspectEntity> createProspect(@Valid @RequestBody ProspectEntity prospect) {
        prospectRepository.save(prospect);
        return ResponseEntity.status(HttpStatus.OK).body(prospect);
    }

    public ResponseEntity<ProspectEntity> getProspect(Long id) {
        Optional<ProspectEntity> prospect = prospectRepository.findById(id);

        if (prospect.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(prospect.get());
    }

    public ResponseEntity<ProspectEntity> updateProspect(Long prospectsId,@Valid @RequestBody ProspectEntity prospect) {
        Optional<ProspectEntity> oldProspect = prospectRepository.findById(prospectsId);

        if(oldProspect.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        prospect.setId(prospectsId);
        prospectRepository.save(prospect);
        return ResponseEntity.status(HttpStatus.OK).body(prospect);
    }

    public ResponseEntity<ProspectEntity> deleteProspect(Long prospectId) {
        Optional<ProspectEntity> prospect = prospectRepository.findById(prospectId);

        if(prospect.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        prospectRepository.delete(prospect.get());
        return ResponseEntity.status(HttpStatus.OK).body(prospect.get());
    }
}
