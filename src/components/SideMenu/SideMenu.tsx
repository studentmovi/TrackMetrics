"use client";
import React from "react";
import "./SideMenu.scss";

interface Props {
    open: boolean;
    onClose: () => void;
}

export const SideMenu: React.FC<Props> = ({ open, onClose }) => {
    return (
        <div className={`side-menu ${open ? "open" : ""}`}>
            <div className="links">
                <a href="/settings">⚙️ Settings</a>
                <a href="/join-engineer">🔗 Join Code Engineer</a>
                <a href="/dashboard">📊 Dashboard</a>
                <a href="/live-dashboard">🟢 Live Dashboard</a>
            </div>

            <button onClick={onClose} className="close-btn">Close</button>
        </div>
    );
};
