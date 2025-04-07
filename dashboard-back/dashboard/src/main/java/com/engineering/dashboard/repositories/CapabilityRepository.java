package com.engineering.dashboard.repositories;

import com.engineering.dashboard.entities.CapabilityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CapabilityRepository extends JpaRepository<CapabilityEntity, Long> 
  {

  }
