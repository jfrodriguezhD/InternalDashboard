package com.engineering.dashboard.services;

import com.engineering.dashboard.entities.ProjectContactEntity;
import com.engineering.dashboard.repositories.ProjectContactRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectContactService {

  @Autowired
  private ProjectContactRepository projectContactRepository;

  /* GET ALL */
  public List<ProjectContactEntity> getAllProjectContacts() {
    return projectContactRepository.findAll();
  }

  /* GET BY ID */
  public ProjectContactEntity getProjectContactById(Long projectContactId) {
    Optional<ProjectContactEntity> projectContact =
      projectContactRepository.findById(projectContactId);
    return projectContact.orElseThrow(() ->
      new RuntimeException("ProjectContact not found")
    );
  }

  /* POST */
  public ProjectContactEntity createProjectContact(
    ProjectContactEntity projectContact
  ) {
    projectContact.setCreatedTime(LocalDateTime.now());
    projectContact.setLastModified(LocalDateTime.now());
    return projectContactRepository.save(projectContact);
  }

  /* PUT */
  public ProjectContactEntity updateProjectContact(
    Long projectContactId,
    ProjectContactEntity projectContactDetails
  ) {
    ProjectContactEntity projectContact = getProjectContactById(
      projectContactId
    );
    projectContact.setLastModified(LocalDateTime.now());
    projectContact.setName(projectContactDetails.getName());
    projectContact.setPhone(projectContactDetails.getPhone());
    projectContact.setProject(projectContactDetails.getProject());
    return projectContactRepository.save(projectContact);
  }

  /* DELETE */
  public void deleteProjectContact(Long projectContactId) {
    ProjectContactEntity projectContact = getProjectContactById(
      projectContactId
    );
    projectContactRepository.delete(projectContact);
  }
}
