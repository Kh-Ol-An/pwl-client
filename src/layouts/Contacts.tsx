import React from 'react';

const Contacts = () => {
    return (
        <div className="contacts">
            <h3>
                Контакти:
            </h3>

            <p>
                Телефон: <a href="tel:+380508899268">+38 050 88 99 268</a>
            </p>

            <p className="contacts-mail">
                Електронна адреса: <a href="mailto:wish-hub@ukr.net">wish-hub@ukr.net</a>
            </p>

            <p className="contacts-ps">
                Якщо у вас є питання або пропозиції, будь ласка, зв'яжіться з нами.
            </p>
        </div>
    );
};

export default Contacts;
