import "./PersonalInfoCard.css";
import InfoViewHeader from "../../atoms/info_view_header/InfoViewHeader";
import { useEffect, useRef } from "react";

interface PersonalInfo{
    phone:number;
    email:string;
    resume:string;
}

function PersonalInfoCard({ phone, email, resume }: PersonalInfo) {
  const personalInfoModal = useRef<HTMLDialogElement>(null);

  function togglePersonalInfoDialog() {
    if (!personalInfoModal.current) {
      return;
    }
    personalInfoModal.current.hasAttribute("open")
      ? personalInfoModal.current.close()
      : personalInfoModal.current.showModal();
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        personalInfoModal.current &&
        event.target === personalInfoModal.current
      ) {
        personalInfoModal.current.close();
      }
    }

    if (personalInfoModal.current) {
      personalInfoModal.current.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (personalInfoModal.current) {
        personalInfoModal.current.removeEventListener(
          "click",
          handleClickOutside
        );
      }
    };
  }, []);

  return (
    <>
      <div className="personal__info__card">
        <InfoViewHeader
          title="Personal Information"
          handleClick={togglePersonalInfoDialog}
          dialogRef={personalInfoModal}
        />
        <div className="personal__info__card__content">
          <p className="personal__info__card_phone">{phone}</p>
          <p className="personal__info__card__email">{email}</p>
          <a href={resume} className="personal__info__card__resume">
            {resume}
          </a>
        </div>
      </div>
      <dialog ref={personalInfoModal} className="personal__info__modal">
        <Personal_Info_Edit closeModal={togglePersonalInfoDialog} />
      </dialog>
    </>
  );
}

export default PersonalInfoCard;
