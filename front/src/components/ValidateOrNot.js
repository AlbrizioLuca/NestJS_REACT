// ValidateOrNot.js
import React from 'react';
import validIcon from '../img/valider.png';
import annulIcon from '../img/annuler.png';

const ValidateOrNot = ({ handleAction, handleCancel }) => {
    return (
        <>
            <td>
                <img src={validIcon} alt="Valider" onClick={handleAction} />
            </td>
            <td>
                <img src={annulIcon} alt="Annuler" onClick={handleCancel} />
            </td>
        </>
    );
};

export default ValidateOrNot;