package com.engineering.dashboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engineering.dashboard.entities.ProspectEntity;

public interface ProspectRepository extends JpaRepository<ProspectEntity, Long> {

}
