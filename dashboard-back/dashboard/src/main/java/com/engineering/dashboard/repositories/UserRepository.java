package com.engineering.dashboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engineering.dashboard.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}