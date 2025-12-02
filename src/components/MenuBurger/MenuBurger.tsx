"use client";
import React from "react";
import "./MenuBurger.scss";

interface Props {
    onToggle: () => void;
}

export const MenuBurger: React.FC<Props> = ({ onToggle }) => {
    return (
        <div className="burger" onClick={onToggle}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};
