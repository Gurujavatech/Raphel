import { useTheme } from "../hooks/use-theme";

import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";

import profileImg from "../assets/profile-image.jpg";

import PropTypes from "prop-types";

import styles from "../layouts/Header.module.css";

export const Header = () => {
    const { theme, setTheme } = useTheme();
  
    return (
      <header className={`${styles.headerContainer} ${theme === "dark" ? styles.darkTheme : ""}`}>
        <div className="flex items-center gap-x-3">
          <div className={styles.searchInput}>
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      </header>
    );
  };