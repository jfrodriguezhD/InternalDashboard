package com.engineering.dashboard.entities;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class RosterEntity {

  @Id
  @GeneratedValue
  private long id;

  private String name;
  private String last_name;
  private String email;
  private long phone;
  private String route_to_resume;

  @ElementCollection
  @Enumerated(EnumType.STRING)
  private List<StatusEnum> status;

  private enum StatusEnum {
    COMING_AVAILABLE, 
	ASSIGNED, 
	AVAILABLE, 
	NOT_AVAILABLE, 
	HOLD 
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
  @JoinTable(
    name = "roster_capabilities",
    joinColumns = @JoinColumn(name = "roster_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(
      name = "capability_id",
      referencedColumnName = "id"
    )
  )
  private List<CapabilityEntity> capabilities;

  @ManyToMany
  @JoinTable(
    name = "roster_subcapabilities",
    joinColumns = @JoinColumn(name = "roster_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(
      name = "capability_id",
      referencedColumnName = "id"
    )
  )
  private List<CapabilityEntity> sub_capabilities;

  @ManyToMany(mappedBy = "roster_prospected")
  private List<ProjectEntity> projects;

  @ManyToOne
  private ProjectEntity project;
}
