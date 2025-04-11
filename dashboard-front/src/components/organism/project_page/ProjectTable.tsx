import "./ProjectTable.css";

interface Project {
  id: number;
  name: string;
  company: string;
  projectContacts: { name: string; phone: string }[];
}

interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  return (
    <table className="project-table">
      <thead>
        <tr className="project-table__row">
          <td className="project-table__name">Project Name</td>
          <td className="project-table__company">Company</td>
          <td className="project-table__contact-name">Contact Name</td>
          <td className="project-table__contact-phone">Phone</td>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr className="project-table__row" key={project.id}>
            <td className="project-table__name">{project.name}</td>
            <td className="project-table__company">{project.company}</td>
            <td className="project-table__contact-name">
              {project.projectContacts && project.projectContacts.length > 0
                ? project.projectContacts[0].name
                : "N/A"}
            </td>
            <td className="project-table__contact-phone">
              {project.projectContacts && project.projectContacts.length > 0
                ? project.projectContacts[0].phone
                : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
