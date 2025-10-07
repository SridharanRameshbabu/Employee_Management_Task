import React, { useState } from "react";
import { FaUsers, FaCalendarAlt, FaEnvelope, FaTachometerAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

const SidebarContainer = styled.div`
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: all 0.3s ease;
  width: ${props => props.$isOpen ? '250px' : '70px'};
  height: 100%;
  position: relative;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow: visible;
`;

const SidebarContent = styled.div`
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow-y: auto;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 1rem;
  font-size: 20px;
  font-weight: 500;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateX(5px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    border-left: 4px solid #fff;
  }
  
  svg {
    font-size: 1.2rem;
    min-width: 20px;
  }
  
  span {
    white-space: nowrap;
    opacity: ${props => props.$isOpen ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: -12px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    transform: scale(1.1);
  }
  
  svg {
    color: #667eea;
    font-size: 0.8rem;
  }
`;

const Sidebar = ({ onSelect, activeItem }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarContent>
        <SidebarItem 
          $isOpen={isOpen}
          className={activeItem === "dashboard" ? "active" : ""}
          onClick={() => onSelect("dashboard")}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </SidebarItem>
        
        <SidebarItem 
          $isOpen={isOpen}
          className={activeItem === "employee" ? "active" : ""}
          onClick={() => onSelect("employee")}
        >
          <FaUsers />
          <span>Employee</span>
        </SidebarItem>
        
        <SidebarItem 
          $isOpen={isOpen}
          className={activeItem === "calendar" ? "active" : ""}
          onClick={() => onSelect("calendar")}
        >
          <FaCalendarAlt />
          <span>Calendar</span>
        </SidebarItem>
        
        <SidebarItem 
          $isOpen={isOpen}
          className={activeItem === "messages" ? "active" : ""}
          onClick={() => onSelect("messages")}
        >
          <FaEnvelope />
          <span>Messages</span>
        </SidebarItem>
      </SidebarContent>

      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </ToggleButton>
    </SidebarContainer>
  );
};

export default Sidebar;