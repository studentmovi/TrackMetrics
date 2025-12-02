"use client";
import styles from "./Footer.module.scss";

export const Footer = () => {
    return (
        <footer className={styles["tm-footer"]}>
            <p>© {new Date().getFullYear()} TrackMetrics — All rights reserved</p>
        </footer>
    );
};

export default Footer;
