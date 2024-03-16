import React from 'react';

const ActivationLinkExpired = () => {
    return (
        <div className="inactivated">
            <p>
                Термін активації акаунта закінчився. <br/>
                Акаунт буде видалений в 00:00 за Київським часом. <br/>
                Зареєструватись за такою ж поштою можна буде знову після видалення старого акаунту.
            </p>
        </div>
    );
};

export default ActivationLinkExpired;
