package com.engineering.dashboard.entities;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Entity
@Data
@Table(name = "prospects")
public class ProspectEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @NotBlank
  private String name;

  @NotBlank
  private String last_name;

  private String email;

  private long phone;

  private String route_to_resume;

  private LocalDateTime createdTime;

  private LocalDateTime lastModified;

  @ElementCollection
  @Enumerated(EnumType.STRING)
  private List<StatusEnum> status;

  private enum StatusEnum {
    ACTIVE,
    HIRED,
    NOT_IN_PROCESS,
    DISCARTED,
    PAUSED,
    ARCHIVED,
  }

  @ElementCollection
  @Enumerated(EnumType.STRING)
  private List<SeniorityEnum> seniority;

  private enum SeniorityEnum {
    SENIOR,
    CONSULTANT,
    ANALYST,
    MANAGER,
  }

  @ElementCollection
  @Enumerated(EnumType.STRING)
  private List<JobTitleEnum> job_title;

  private enum JobTitleEnum {
    BACKEND_DEVELOPER,
    FRONTEND_DEVELOPER,
    FULLSTACK_DEVELOPER,
  }

  @ManyToMany
  @JoinTable(name = "prospect_capabilities", joinColumns = @JoinColumn(name = "prospect_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "capability_id", referencedColumnName = "id"))
  private List<CapabilityEntity> capabilities;

  @ManyToMany
  @JoinTable(name = "prospect_subcapabilities", joinColumns = @JoinColumn(name = "prospect_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "capability_id", referencedColumnName = "id"))
  private List<CapabilityEntity> sub_capabilities;

  @ManyToMany
  @JoinTable(name = "prospect_project", joinColumns = @JoinColumn(name = "prospect_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"))
  private List<ProjectEntity> projects;
}
