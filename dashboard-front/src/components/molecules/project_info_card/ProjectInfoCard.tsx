import './ProjectInfoCard.css'
import InfoViewHeader from "../../atoms/info_view_header/InfoViewHeader";

interface ProjectInfo{
    projectId:number;
    projectName:string;
}

function ProjectInfoCard({projectId,projectName}:ProjectInfo){
    const colors:string[] = ["red","blue","green","yellow","purple"];
    const setColor = (text:string): string =>{
        console.log(text);
        const index=Math.floor(Math.random() * (4 - 0 + 1));
        console.log(index);
        return colors[index];
    }

    const projectInfo = ()=>{
        console.log(projectId);
    };
    return(
        <>
        <div className="project__info__card">
            <InfoViewHeader title="Project Information"/>
            <div className='project__info__list'>
                <p className={"project__info__card__color__"+setColor(projectName)} onClick={projectInfo}>{projectName}</p>
            </div>
        </div>
        </>
    )
}

export default ProjectInfoCard