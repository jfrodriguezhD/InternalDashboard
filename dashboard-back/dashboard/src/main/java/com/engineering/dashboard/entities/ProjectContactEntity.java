package com.engineering.dashboard.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Data
@Table(name = "project_contacts")
public class ProjectContactEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  @Positive
  private Long phone;

  private LocalDateTime createdTime;
  private LocalDateTime lastModified;

  @ManyToOne
  @JoinColumn(name = "project_id")
  @JsonBackReference
  private ProjectEntity project;
}
