package com.engineering.dashboard.controllers;

import com.engineering.dashboard.entities.ProjectEntity;
import com.engineering.dashboard.services.ProjectService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {

  @Autowired
  private ProjectService projectService;

  @GetMapping("")
  public List<ProjectEntity> getAllProjects() {
    return projectService.getAllProjects();
  }

  @GetMapping("/{id}")
  public ProjectEntity getProject(@PathVariable Long id) {
    return projectService.getProjectById(id);
  }

  @PostMapping("")
  public ProjectEntity postProject(@Valid @RequestBody ProjectEntity project) {
    return projectService.createProject(project);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProjectEntity> putProject(
    @PathVariable Long id,
    @Valid @RequestBody ProjectEntity project
  ) {
    return projectService.updateProject(id, project);
  }

  @DeleteMapping("/{id}")
  public void deleteProject(@PathVariable Long id) {
    projectService.deleteProject(id);
  }
}
