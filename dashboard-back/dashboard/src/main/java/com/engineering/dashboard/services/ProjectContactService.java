package com.engineering.dashboard.services;

import com.engineering.dashboard.entities.ProjectContactEntity;
import com.engineering.dashboard.repositories.ProjectContactRepository;
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
