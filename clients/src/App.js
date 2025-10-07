import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import ViewEmployee from "./components/ViewEmployee";
import EditEmployee from "./components/EditEmployee";
import AddEmployee from "./components/AddEmployee";
import styled from "styled-components";

const AppLayout = styled.div`
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;
const SidebarWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  height: calc(100vh - 60px);
  z-index: 999;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  padding: 2rem;
  background-color: #f8f9fa;
  overflow-y: auto;
  height: calc(100vh - 60px);
  
  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const App = () => {
  const [page, setPage] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <AppLayout>
      <Navbar />
      <MainLayout>
        <SidebarWrapper>
          <Sidebar onSelect={setPage} />
        </SidebarWrapper>
        <ContentArea>
          {page === "dashboard" && <Dashboard onNavigate={setPage} />}
          
          {page === "employee" && (
            <EmployeeList
              onView={(emp) => {
                setSelectedEmployee(emp);
                setPage("view");
              }}
              onEdit={(emp) => {
                setSelectedEmployee(emp);
                setPage("edit");
              }}
              onAdd={() => setPage("add")}
            />
          )}

          {page === "add" && (
            <AddEmployee
              onBack={() => setPage("employee")}
              onSave={() => setPage("employee")}
            />
          )}

          {page === "view" && (
            <ViewEmployee
              employee={selectedEmployee}
              onBack={() => setPage("employee")}
            />
          )}

          {page === "edit" && (
            <EditEmployee
              employee={selectedEmployee}
              onSave={() => setPage("employee")}
              onBack={() => setPage("employee")}
            />
          )}
        </ContentArea>
      </MainLayout>
    </AppLayout>
  );
};

export default App;