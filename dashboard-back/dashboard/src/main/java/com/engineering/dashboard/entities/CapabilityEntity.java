package com.engineering.dashboard.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "capabilities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CapabilityEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private String type;

  private LocalDateTime createdTime;
  private LocalDateTime lastModified;

  @ElementCollection
  @Enumerated(EnumType.STRING)
  @Column(name = "enum_values")
  private List<CapabilityEnum> enumValues;

  public enum CapabilityEnum {
    MAIN_CAPABILITY,
    SECONDARY_CAPABILITY,
  }

  @JsonIgnore
  @ManyToMany(mappedBy = "capabilities")
  private List<ProspectEntity> prospects;

  @JsonIgnore
  @ManyToMany(mappedBy = "sub_capabilities")
  private List<ProspectEntity> prospects_sub;
}
