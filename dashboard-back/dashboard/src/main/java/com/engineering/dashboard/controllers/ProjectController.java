package com.engineering.dashboard.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.engineering.dashboard.entities.ProjectEntity;
import com.engineering.dashboard.services.ProjectService;

import jakarta.validation.Valid;

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
    public ProjectEntity putProject(@PathVariable Long id, @RequestBody ProjectEntity project) {

        return projectService.modifyProject(id, project);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {

        projectService.deleteProject(id);
    }

}
