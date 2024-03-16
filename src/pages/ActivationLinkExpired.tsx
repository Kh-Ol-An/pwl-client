import React from 'react';
import Button from '../components/Button';

const ActivationLinkExpired = () => {
    return (
        <div className="inactivated">
            <p>
                Посилання активації акаунта прострочене. <br/>
                Щоб отримати ще одного листа з посиланням для активації акаунта, натисніть <Button to="#" variant="text">сюди</Button> <br/><br/>
                <span className="attention">Якщо не активувати акаунт протягом доби з моменту реєстрації, він буде видалений.</span>
            </p>
        </div>
    );
};

export default ActivationLinkExpired;
