package com.engineering.dashboard.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Entity
@Data
@Table(name = "project") // Correct table name
public class ProjectEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @NotBlank
  private String name;

  @NotBlank
  private String company;

  @OneToMany(mappedBy = "project")
  private List<ProjectContactEntity> projectContacts;

  @OneToMany(mappedBy = "project")
  private List<RosterEntity> roster;

  @JsonIgnore
  @ManyToMany(mappedBy = "projects")
  private List<ProspectEntity> prospects;

  private LocalDateTime createdTime;
  private LocalDateTime lastModified;

  @ManyToMany
  @JoinTable(
    name = "roster_project",
    joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(
      name = "roster_id",
      referencedColumnName = "id"
    )
  )
  private List<RosterEntity> roster_prospected;
}
