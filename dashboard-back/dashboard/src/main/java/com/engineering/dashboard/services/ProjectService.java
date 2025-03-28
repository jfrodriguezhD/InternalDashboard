package com.engineering.dashboard.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.engineering.dashboard.entities.ProjectEntity;
import com.engineering.dashboard.repositories.ProjectRepository;

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
            // Add exception
            return null;
        }
        return optionalProject.get();
    }

    public ProjectEntity createProject(ProjectEntity project) {

        return projectRepo.save(project);
    }

    public ProjectEntity modifyProject(Long id, ProjectEntity newProject) {

        newProject.setId(id);
        return projectRepo.save(newProject);
    }

    public void deleteProject(Long id) {

        projectRepo.deleteById(id);
    }

}
