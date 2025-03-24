package com.engineering.dashboard.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class ProspectEntity {
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
		ACTIVE, HIRED, NOT_IN_PROCESS, DISCARTED, PAUSED, ARCHIVED
	}
	
	@ElementCollection
	@Enumerated(EnumType.STRING)
	private List<SeniorityEnum> seniority;
	private enum SeniorityEnum{
		SENIOR, CONSULTANT, ANALYST, MANAGER
	};
	
	@ElementCollection
	@Enumerated(EnumType.STRING)
	private List<JobTitleEnum> job_title;
	private enum JobTitleEnum{
		BACKEND_DEVELOPER, FRONTEND_DEVELOPER, FULLSTACK_DEVELOPER
	};

	@ManyToMany(mappedBy = "prospects")
	private List<CapabilityEntity> capabilities;
	@ManyToMany(mappedBy = "prospects")
	private List<CapabilityEntity> sub_capabilities;
	@ManyToMany(mappedBy = "prospects")
	private List<ProjectEntity> prospected_for;
}
