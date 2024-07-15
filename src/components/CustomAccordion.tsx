import React, { FC, ReactNode } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StylesVariables from '@/styles/utils/variables.module.scss';

interface IProps {
    defaultExpanded?: boolean;
    ariaControls: string;
    titleId: string;
    title: ReactNode;
    contentId: string;
    children: ReactNode;
}

const CustomAccordion: FC<IProps> = ({
                                         defaultExpanded = false,
                                         ariaControls,
                                         titleId,
                                         title,
                                         contentId,
                                         children
                                     }) => {
    return (
        <Accordion defaultExpanded={ defaultExpanded } sx={ { backgroundColor: StylesVariables.accentColor } }>
            <AccordionSummary expandIcon={ <ExpandMoreIcon /> } aria-controls={ ariaControls } id={ titleId }>
                <h2>{ title }</h2>
            </AccordionSummary>

            <AccordionDetails id={ contentId }>
                { children }
            </AccordionDetails>
        </Accordion>
    );
};

export default CustomAccordion;
