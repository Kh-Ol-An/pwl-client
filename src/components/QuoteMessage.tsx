import React, { FC } from 'react';

interface IProps {
    title: string;
    text: string;
    author: string;
}

const QuoteMessage: FC<IProps> = ({ title, text, author }) => {
    return (
        <div className="quote-message">
            <h6>{ title }</h6>
            { text && (
                <div className="quote-message_box">
                    <p>{ text }</p>
                    <span>{ author }</span>
                </div>
            ) }
        </div>
    );
};

export default QuoteMessage;
