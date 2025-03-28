package com.engineering.dashboard.controllers;

import com.engineering.dashboard.entities.ProjectContactEntity;
import com.engineering.dashboard.services.ProjectContactService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project_contact")
public class ProjectContactController {

  @Autowired
  private ProjectContactService projectContactService;

  /* GET ALL */
  @GetMapping
  public List<ProjectContactEntity> getAllProjectContacts() {
    return projectContactService.getAllProjectContacts();
  }

  /* GET BY ID */
  @GetMapping("/{projectContactId}")
  public ResponseEntity<ProjectContactEntity> getProjectContactById(
    @PathVariable Long projectContactId
  ) {
    ProjectContactEntity projectContact =
      projectContactService.getProjectContactById(projectContactId);
    return ResponseEntity.ok(projectContact);
  }

  /* POST */
  @PostMapping
  public ProjectContactEntity createProjectContact(
    @RequestBody ProjectContactEntity projectContact
  ) {
    return projectContactService.createProjectContact(projectContact);
  }

  /* PUT */
  @PutMapping("/{projectContactId}")
  public ResponseEntity<ProjectContactEntity> updateProjectContact(
    @PathVariable Long projectContactId,
    @RequestBody ProjectContactEntity projectContactDetails
  ) {
    ProjectContactEntity updatedProjectContact =
      projectContactService.updateProjectContact(
        projectContactId,
        projectContactDetails
      );
    return ResponseEntity.ok(updatedProjectContact);
  }

  /* DELETE */
  @DeleteMapping("/{projectContactId}")
  public ResponseEntity<Void> deleteProjectContact(
    @PathVariable Long projectContactId
  ) {
    projectContactService.deleteProjectContact(projectContactId);
    return ResponseEntity.noContent().build();
  }
}
