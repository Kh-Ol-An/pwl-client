import React, { FC } from 'react';
import { Root, SubText, SubTitle, Text, Title } from './NotFoundPageStyles';

const NotFoundPage: FC = () => {
    return (
        <Root>
            <Title variant="h1">Сторінку не знайдено</Title>
            <SubTitle variant="h2">404</SubTitle>
            <Text variant="h2">Ой! Сторінки, яку ви шукали, не існує.</Text>
            <SubText variant="h2">Можливо, ви неправильно ввели адресу сторінки.</SubText>
        </Root>
    );
};

export default NotFoundPage;
