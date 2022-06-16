import React from 'react';
import placeholder from "../../assets/placeholder.svg"

export const Preloader = () => {
    return (
        <div style={{position: "fixed", top: "30%", left: "50%", width: "100%"}}>
            <img src={placeholder} alt="placeholder"/>
        </div>
    );
};

