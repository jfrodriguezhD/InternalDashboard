package com.engineering.dashboard.controllers;

import com.engineering.dashboard.entities.ProspectEntity;
import com.engineering.dashboard.services.ProspectService;
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

@RestController
@RequestMapping("/api/v1/prospect")
public class ProspectController {

  @Autowired
  ProspectService prospectService;

  @GetMapping("")
  public ResponseEntity<List<ProspectEntity>> getProspects() {
    return prospectService.getAllProspects();
  }

  @PostMapping("")
  public ResponseEntity<ProspectEntity> postProspect(
    @RequestBody ProspectEntity prospect
  ) {
    return prospectService.createProspect(prospect);
  }

  @GetMapping("/{prospectId}")
  public ResponseEntity<ProspectEntity> getProspect(
    @PathVariable Long prospectId
  ) {
    return prospectService.getProspect(prospectId);
  }

  @PutMapping("/{prospectId}")
  public ResponseEntity<ProspectEntity> putProspect(
    @PathVariable Long prospectId,
    @RequestBody ProspectEntity prospect
  ) {
    return prospectService.updateProspect(prospectId, prospect);
  }

  @DeleteMapping("/{prospectId}")
  public ResponseEntity<ProspectEntity> deleteProspect(
    @PathVariable Long prospectId
  ) {
    return prospectService.deleteProspect(prospectId);
  }
}
