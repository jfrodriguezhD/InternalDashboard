import './ProspectView.css'
import PersonalInfoCard from "../../molecules/personal_info_card/PersonalInfoCard"
import ProfileInfoCard from "../../molecules/profile_info_card/ProfileInfoCard"
import ProjectInfoCard from "../../molecules/project_info_card/ProjectInfoCard"
import prospect from './prospect.json'
import { forwardRef } from 'react'

interface Props {
    toggleDialog: () => void;
}

export default forwardRef<HTMLDialogElement, Props>(function ProspectView({toggleDialog},ref)
{
    return(
        <dialog ref={ref} className="prospect-modal-view">
        <div className="prospect__view__modal">
            <div className="prospect__view__modal__header">
                <h2>Prospect Information</h2>
                <button className="close-modal" onClick={() => toggleDialog()}>
                X
                </button>
            </div>
            <ProfileInfoCard name={prospect.name}
                            lastName={prospect.lastName}
                            capabilities={prospect.capabilities}
                            jobTitle={prospect.job_title}
                            seniority={prospect.seniority}
                            status={prospect.status}
                            subcapabilities={prospect.subcapailities}/>
            <PersonalInfoCard   phone={prospect.info.phone}
                                email={prospect.info.email}
                                resume={prospect.info.resume}/>
            <ProjectInfoCard projectId={prospect.project.id}
                            projectName={prospect.project.name}/>
        </div>
        </dialog>
    )
});