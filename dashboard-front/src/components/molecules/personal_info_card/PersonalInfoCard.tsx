import './PersonalInfoCard.css'
import InfoViewHeader from "../../atoms/info_view_header/InfoViewHeader";

interface PersonalInfo{
    phone:string;
    email:string;
    resume:string;
}

function PersonalInfoCard({phone, email, resume}:PersonalInfo){

    return(
        <>
        <div className="personal__info__card">
            <InfoViewHeader title="Personal Information"/>
            <div className='personal__info__card__content'>
                <p className='personal__info__card_phone'>{phone}</p>
                <p className='personal__info__card__email'>{email}</p>
                <a href={resume} className='personal__info__card__resume'>{resume}</a>
            </div>
        </div>
        </>
    )
}

export default PersonalInfoCard