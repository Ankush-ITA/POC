import React from "react";
import "./Sidebar.css";

const items = ["Dashboard", "LiveChats", "Reports", "Settings"];

const Sidebar = ({ selectedItem, onSelect, showMobileMenu }) => {
  return (
    <aside className={`sidebar ${showMobileMenu ? "mobile-visible" : ""}`}>
      {items.map((item) => (
        <div
          key={item}
          className={`sidebar-item ${selectedItem === item ? "active" : ""}`}
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
