import React from 'react';
import Prompt from 'rn-prompt';
 
const TextPrompt = ({ 
    titleTextPrompt, 
    textTextPrompt, 
    isVisible, 
    onSubmitBtnCallBack, 
    onCancelBtnCallBack }) => (
    <Prompt
    title={titleTextPrompt ? titleTextPrompt : ''}
    placeholder='Exemple : Acheter de la bière'
    defaultValue={textTextPrompt}
    visible={isVisible}
    onCancel={onCancelBtnCallBack}
    onSubmit={(value) => onSubmitBtnCallBack(value)}
    />
);

export default TextPrompt;
