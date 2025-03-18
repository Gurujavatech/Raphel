import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "../constants";

import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";

import styles from './Sidebar.module.css'

import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside ref={ref} className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
            <div className={styles.logoContainer}>
                <img src={logoLight} alt="Logoipsum" className="dark:hidden" />
                <img src={logoDark} alt="Logoipsum" className="hidden dark:block" />
                {!isCollapsed && <p className={styles.logoText}>Logoipsum</p>}
            </div>

            {/* Toggle Switch */}
            <div className={styles.toggleContainer}>
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        checked={isCollapsed}
                        onChange={() => setIsCollapsed(!isCollapsed)}
                    />
                    <span className={styles.slider}></span>
                </label>
                {!isCollapsed && <p className={styles.toggleLabel}>Collapse Sidebar</p>}
            </div>

            <div className={styles.sidebarLinks}>
                {navbarLinks.map((navbarLink) => (
                    <nav key={navbarLink.title} className={styles.sidebarGroup}>
                        <p className={`${styles.sidebarGroupTitle} ${isCollapsed ? styles.collapsedTitle : ""}`}>
                            {navbarLink.title}
                        </p>
                        {navbarLink.links.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.path}
                                className={({ isActive }) =>
                                    `${styles.sidebarItem} ${isActive ? styles.active : ""} ${isCollapsed ? styles.collapsedItem : ""}`
                                }
                            >
                                <link.icon size={22} className="flex-shrink-0" />
                                {!isCollapsed && <p>{link.label}</p>}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";
Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};