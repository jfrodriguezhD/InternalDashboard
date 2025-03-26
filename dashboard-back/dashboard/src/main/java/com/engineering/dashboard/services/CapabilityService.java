package com.engineering.dashboard.services;

import com.engineering.dashboard.entities.CapabilityEntity;
import com.engineering.dashboard.repositories.CapabilityRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CapabilityService {

  @Autowired
  private CapabilityRepository capabilityRepository;

  /* GET ALL */
  public ResponseEntity<List<CapabilityEntity>> getAllCapabilities() {
    List<CapabilityEntity> capabilities = capabilityRepository.findAll();
    return ResponseEntity.ok(capabilities);
  }

  /* GET BY ID */
  public ResponseEntity<CapabilityEntity> getCapabilityById(
    Long capabilitiesId
  ) {
    Optional<CapabilityEntity> capability = capabilityRepository.findById(
      capabilitiesId
    );
    return capability
      .map(ResponseEntity::ok)
      .orElseGet(() -> ResponseEntity.notFound().build());
  }

  /* POST */
  public ResponseEntity<CapabilityEntity> createCapability(
    CapabilityEntity capabilityEntity
  ) {
    CapabilityEntity savedCapability = capabilityRepository.save(
      capabilityEntity
    );
    return ResponseEntity.ok(savedCapability);
  }

  /* PUT */
  public ResponseEntity<CapabilityEntity> updateCapability(
    Long capabilitiesId,
    CapabilityEntity capabilityEntity
  ) {
    if (!capabilityRepository.existsById(capabilitiesId)) {
      return ResponseEntity.notFound().build();
    }
    capabilityEntity.setId(capabilitiesId);
    CapabilityEntity updatedCapability = capabilityRepository.save(
      capabilityEntity
    );
    return ResponseEntity.ok(updatedCapability);
  }

  /* DELETE */
  public ResponseEntity<Void> deleteCapability(Long capabilitiesId) {
    if (!capabilityRepository.existsById(capabilitiesId)) {
      return ResponseEntity.notFound().build();
    }
    capabilityRepository.deleteById(capabilitiesId);
    return ResponseEntity.noContent().build();
  }
}
