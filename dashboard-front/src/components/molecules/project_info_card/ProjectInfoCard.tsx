import './ProjectInfoCard.css'
import InfoViewHeader from "../../atoms/info_view_header/InfoViewHeader";
import { Projects } from '../../atoms/prospect_row/Prospect_Row';

interface Props{
    project:Projects;
}

function ProjectInfoCard({project}:Props){
    const colors:string[] = ["red","blue","green","yellow","purple"];
    const setColor = (text:string): string =>{
        console.log(text);
        const index=Math.floor(Math.random() * (4 - 0 + 1));
        console.log(index);
        return colors[index];
    }

    const projectInfo = ()=>{
        console.log("projectId");
    };
    return(
        <>
        <div className="project__info__card">
            <InfoViewHeader title="Project Information" />
            <div className='project__info__list'>
                {project==null? <p onClick={projectInfo}>Not prospected for a project</p>:<p className={"project__info__card__color__"+setColor(project.name)} onClick={projectInfo}>{project.name}</p>}
            </div>
        </div>
        </>
    )
}

export default ProjectInfoCard