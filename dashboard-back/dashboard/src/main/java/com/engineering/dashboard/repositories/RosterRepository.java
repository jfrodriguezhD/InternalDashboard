package com.engineering.dashboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engineering.dashboard.entities.RosterEntity;

public interface RosterRepository extends JpaRepository<RosterEntity, Long>{

}
