package com.engineering.dashboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engineering.dashboard.entities.ProjectEntity;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {

}
