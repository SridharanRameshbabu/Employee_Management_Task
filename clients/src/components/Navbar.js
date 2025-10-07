import React from "react";
import { FaCog, FaBell, FaUser } from "react-icons/fa";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 0.8rem 0;
  border-bottom: 3px solid rgba(255, 255, 255, 0.1);
`;

const BrandLogo = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  color: white;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoAccent = styled.span`
  color: #e3f2fd;
  font-weight: 800;
`;

const IconWrapper = styled.div`
  padding: 0.6rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const StyledIcon = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.3rem;
  transition: all 0.3s ease;
  
  ${IconWrapper}:hover & {
    color: #ffffff;
    transform: scale(1.1);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background: linear-gradient(45deg, #ff6b6b, #ff4757);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #667eea;
  // animation: pulse 1.5s infinite;
  
  // @keyframes pulse {
  //   0% {
  //     transform: scale(1);
  //   }
  //   50% {
  //     transform: scale(1.1);
  //   }
  //   100% {
  //     transform: scale(1);
  //   }
  // }
`;

const IconsContainer = styled.div`
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        {/* Brand Logo */}
        <BrandLogo className="navbar-brand ms-5">
          <LogoAccent>RS</LogoAccent>-Tech
        </BrandLogo>
        
        {/* Navigation Icons */}
        <IconsContainer className="ms-auto d-flex align-items-center">
          <IconWrapper title="Settings">
            <StyledIcon as={FaCog} />
          </IconWrapper>
          
          <IconWrapper title="Notifications">
            <StyledIcon as={FaBell} />
            <NotificationBadge>5</NotificationBadge>
          </IconWrapper>
          
          <IconWrapper title="Profile">
            <StyledIcon as={FaUser} />
          </IconWrapper>
        </IconsContainer>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;