package com.engineering.dashboard.services;

import com.engineering.dashboard.entities.ProjectEntity;
import com.engineering.dashboard.entities.ProspectEntity;
import com.engineering.dashboard.repositories.ProspectRepository;
import jakarta.validation.Valid;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class ProspectService {

  @Autowired
  private ProspectRepository prospectRepository;

  public ResponseEntity<List<ProspectEntity>> getAllProspects() {
    List<ProspectEntity> prospects = prospectRepository.findAll();
    return ResponseEntity.status(HttpStatus.OK).body(prospects);
  }

  public ResponseEntity<ProspectEntity> createProspect(
    @Valid @RequestBody ProspectEntity prospect
  ) {
    prospect.setCreatedTime(LocalDateTime.now());
    prospect.setLastModified(LocalDateTime.now());
    prospectRepository.save(prospect);
    return ResponseEntity.status(HttpStatus.OK).body(prospect);
  }

  public ResponseEntity<ProspectEntity> getProspect(Long id) {
    Optional<ProspectEntity> prospect = prospectRepository.findById(id);

    if (prospect.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    return ResponseEntity.status(HttpStatus.OK).body(prospect.get());
  }

  public ResponseEntity<ProspectEntity> updateProspect(
    Long prospectsId,
    @Valid @RequestBody ProspectEntity prospect
  ) {
    Optional<ProspectEntity> oldProspectOpt = prospectRepository.findById(
      prospectsId
    );

    if (oldProspectOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    ProspectEntity oldProspect = oldProspectOpt.get();

    if (prospect.getName() != null) {
      oldProspect.setName(prospect.getName());
    }
    if (prospect.getLast_name() != null) {
      oldProspect.setLast_name(prospect.getLast_name());
    }
    if (prospect.getEmail() != null) {
      oldProspect.setEmail(prospect.getEmail());
    }
    if (prospect.getPhone() != 0) {
      oldProspect.setPhone(prospect.getPhone());
    }
    if (prospect.getRoute_to_resume() != null) {
      oldProspect.setRoute_to_resume(prospect.getRoute_to_resume());
    }
    if (prospect.getStatus() != null) {
      oldProspect.setStatus(prospect.getStatus());
    }
    if (prospect.getSeniority() != null) {
      oldProspect.setSeniority(prospect.getSeniority());
    }
    if (prospect.getJob_title() != null) {
      oldProspect.setJob_title(prospect.getJob_title());
    }
    if (prospect.getCapabilities() != null) {
      oldProspect.setCapabilities(prospect.getCapabilities());
    }
    if (prospect.getSub_capabilities() != null) {
      oldProspect.setSub_capabilities(prospect.getSub_capabilities());
    }
    if (prospect.getProjects() != null) {
      List<ProjectEntity> existingProjects = oldProspect.getProjects();
      List<ProjectEntity> newProjects = prospect.getProjects();
      for (ProjectEntity newProject : newProjects) {
        if (!existingProjects.contains(newProject)) {
          existingProjects.add(newProject);
        }
      }
      oldProspect.setProjects(existingProjects);
    }
    
    oldProspect.setLastModified(LocalDateTime.now());
    prospectRepository.save(oldProspect);
    return ResponseEntity.status(HttpStatus.OK).body(oldProspect);
  }

  public ResponseEntity<ProspectEntity> deleteProspect(Long prospectId) {
    Optional<ProspectEntity> prospect = prospectRepository.findById(prospectId);

    if (prospect.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    prospectRepository.delete(prospect.get());
    return ResponseEntity.status(HttpStatus.OK).body(prospect.get());
  }
}
