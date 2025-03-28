package com.engineering.dashboard.controllers;

import com.engineering.dashboard.entities.CapabilityEntity;
import com.engineering.dashboard.services.CapabilityService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/capability")
public class CapabilityController {

  @Autowired
  private CapabilityService capabilityService;

  /* GET ALL */
  @GetMapping
  public ResponseEntity<List<CapabilityEntity>> getAllCapabilities() {
    return capabilityService.getAllCapabilities();
  }

  /* GET BY ID */
  @GetMapping("/{capabilityId}")
  public ResponseEntity<CapabilityEntity> getCapabilityById(
    @PathVariable Long capabilitiesId
  ) {
    return capabilityService.getCapabilityById(capabilitiesId);
  }

  /* POST*/
  @PostMapping
  public ResponseEntity<CapabilityEntity> createCapability(
    @RequestBody CapabilityEntity capabilityEntity
  ) {
    return capabilityService.createCapability(capabilityEntity);
  }

  /* PUT */
  @PutMapping("/{capabilityId}")
  public ResponseEntity<CapabilityEntity> updateCapability(
    @PathVariable Long capabilitiesId,
    @RequestBody CapabilityEntity capabilityEntity
  ) {
    return capabilityService.updateCapability(capabilitiesId, capabilityEntity);
  }

  /* DELETE */
  @DeleteMapping("/{capabilityId}")
  public ResponseEntity<Void> deleteCapability(
    @PathVariable Long capabilitiesId
  ) {
    return capabilityService.deleteCapability(capabilitiesId);
  }
}
