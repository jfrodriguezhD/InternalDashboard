package com.engineering.dashboard.controllers;

import com.engineering.dashboard.entities.ProjectEntity;
import com.engineering.dashboard.services.ProjectService;
import jakarta.validation.Valid;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {

  @Autowired
  ProjectService projectService;

  @GetMapping("")
  public List<ProjectEntity> getAllProjects() {
    return projectService.getAllProjects();
  }

  @GetMapping("/{id}")
  public ProjectEntity getProject(@PathVariable Long id) {
    return projectService.getProjectById(id);
  }

  @PostMapping("")
  public ProjectEntity postProject(@Valid @RequestBody ProjectEntity projects) {
    return projectService.createProject(projects);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProjectEntity> putProject(
    @PathVariable Long id,
    @RequestBody ProjectEntity projects
  ) {
    return projectService.updateProject(id, projects);
  }

  @DeleteMapping("/{id}")
  public void deleteProject(@PathVariable Long id) {
    projectService.deleteProject(id);
  }
}
