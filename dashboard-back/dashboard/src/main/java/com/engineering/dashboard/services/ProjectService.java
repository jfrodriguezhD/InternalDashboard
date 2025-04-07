package com.engineering.dashboard.services;

import com.engineering.dashboard.entities.ProjectEntity;
import com.engineering.dashboard.repositories.ProjectRepository;
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
public class ProjectService {

  @Autowired
  private ProjectRepository projectRepo;

  public List<ProjectEntity> getAllProjects() {
    return projectRepo.findAll();
  }

  public ProjectEntity getProjectById(Long id) {
    Optional<ProjectEntity> optionalProject = projectRepo.findById(id);
    if (optionalProject.isEmpty()) {
      return null;
    }
    return optionalProject.get();
  }

  public ProjectEntity createProject(ProjectEntity project) {
    project.setCreatedTime(LocalDateTime.now());
    project.setLastModified(LocalDateTime.now());
    return projectRepo.save(project);
  }

  public ResponseEntity<ProjectEntity> updateProject(
    Long id,
    @Valid @RequestBody ProjectEntity newProject
  ) {
    Optional<ProjectEntity> oldProject = projectRepo.findById(id);
    if (oldProject.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    newProject.setLastModified(LocalDateTime.now());
    newProject.setId(id);
    projectRepo.save(newProject);
    return ResponseEntity.status(HttpStatus.OK).body(newProject);
  }

  public void deleteProject(Long id) {
    projectRepo.deleteById(id);
  }
}
