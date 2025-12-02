"use client";
import React, { useState } from "react";
import { MenuBurger } from "@/components/MenuBurger/MenuBurger";
import { SideMenu } from "@/components/SideMenu/SideMenu";
import "./SessionHistoryPage.module.scss";
import { SessionHistory } from "@/components/SessionHistory/SessionHistory";

export default function SessionHistoryPage() {
    return (
        <div className="page">
            <SessionHistory />
        </div>
    );
}
