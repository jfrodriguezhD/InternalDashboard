import "./PersonalInfoCard.css";
import InfoViewHeader from "../../atoms/info_view_header/InfoViewHeader";
import { useEffect, useRef } from "react";
import { Personal_Info_Edit } from "../personal_info/personal_info";

interface PersonalInfo {
  phone: number;
  email: string;
  resume: string;
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
          title="Personal"
          handleClick={togglePersonalInfoDialog}
          dialogRef={personalInfoModal}
        />
        <div className="personal__info__card__content">
          <p className="personal__info__card_phone">
            <i className="fa-solid fa-envelope"></i> {phone}
          </p>
          <p className="personal__info__card__email">
            <i className="fa-solid fa-mobile"></i>
            {email}
          </p>
          <div className="personal__info__card__resume">
            <p>Resume:</p>
            <a href={resume} className="personal__info__card__resume__file">
              <i className="fa-solid fa-file"></i>
              {resume ? resume : "No resume"}
            </a>
          </div>
        </div>
      </div>
      <dialog ref={personalInfoModal} className="personal__info__modal">
        <Personal_Info_Edit closeModal={togglePersonalInfoDialog} />
      </dialog>
    </>
  );
}

export default PersonalInfoCard;
