import './ProspectView.css'
import PersonalInfoCard from "../../molecules/personal_info_card/PersonalInfoCard"
import ProfileInfoCard from "../../molecules/profile_info_card/ProfileInfoCard"
import ProjectInfoCard from "../../molecules/project_info_card/ProjectInfoCard"
import { forwardRef } from 'react'
import { Prospects } from '../../atoms/prospect_row/Prospect_Row'

interface Props {
    toggleDialog: () => void;
    prospect: Prospects;
}

export default forwardRef<HTMLDialogElement, Props>(function ProspectView({toggleDialog,prospect},ref)
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
                            lastName={prospect.last_name}
                            capabilities={prospect.capabilities}
                            jobTitle={prospect.job_title}
                            seniority={prospect.seniority}
                            status={prospect.status}
                            subcapabilities={prospect.sub_capabilities}/>
            <PersonalInfoCard   phone={prospect.phone}
                                email={prospect.email}
                                resume={prospect.route_to_resume}/>
            <ProjectInfoCard projectId={0} projectName='temp'/>
        </div>
        </dialog>
    )
});