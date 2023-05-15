import React from "react";
import './InfoToolTip.css'
import success from '../../images/success.svg'
import fail from '../../images/Fail.svg'
function InfoToolTip (props){
    const isOpen =  props.isSuccess || props.isFail
    return (
        <div  className= { isOpen ? "popup popup_opened" : "popup" }>
            <div className="popup__container">
                <div className="popup__content">
                <button onClick={props.onClose} type="button" className="popup__close popup__close-profile"/>
                <img className="popup__image" alt="ddd" src={props.isSuccess ? success : fail}/>
                <h2 className="popup__inform">{props.isSuccess? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
                </div>
            </div>
        </div>
    )
}

export default InfoToolTip