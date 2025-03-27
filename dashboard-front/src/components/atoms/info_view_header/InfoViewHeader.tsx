import ToolButton from '../toolbutton/ToolButton'
import './InfoViewHeader.css'

function InfoViewHeader({title}:{title:string}){

    const edit = () =>{

    };

    return(
        <>
        <div className='info__view__header'>
            <h4>{title}</h4>
            <ToolButton word='Edit' icon='fa-solid fa-pencil' group='tools' handleClick={edit} key={title}/>
        </div>
        </>
    )
}

export default InfoViewHeader