package com.engineering.dashboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engineering.dashboard.entities.ProjectContactEntity;

public interface ProjectContactRepository extends JpaRepository<ProjectContactEntity, Long> {

}
