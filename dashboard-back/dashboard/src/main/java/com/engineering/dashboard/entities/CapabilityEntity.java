package com.engineering.dashboard.entities;

import jakarta.persistence.*;
import java.util.List;
import lombok.*;

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

  @ElementCollection
  @Enumerated(EnumType.STRING)
  @Column(name = "enum_values")
  private List<CapabilityEnum> enumValues;

  public enum CapabilityEnum {
    MAIN_CAPABILITY,
    SECONDARY_CAPABILITY,
  }

  @ManyToMany(mappedBy = "capabilities")
  private List<ProspectEntity> prospects;

  @ManyToMany(mappedBy = "sub_capabilities")
  private List<ProspectEntity> prospects_sub;
}
