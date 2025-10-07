import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEye, FaEdit, FaTrash, FaSearch, FaPlus, FaExclamationTriangle } from "react-icons/fa";
import styled from "styled-components";
import toast from "react-hot-toast";

const Container = styled.div`
  padding: 2rem;
  background: #f8f9fa;
  min-height: calc(100vh - 60px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h4`
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9aa0a6;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  th {
    color: white;
    font-weight: 600;
    padding: 1rem;
    text-align: center;
    border: none;
    font-size: 0.9rem;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  border: none;
  color: #2c3e50;
`;

const EmployeeCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
`;

const AvatarPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px solid #e0e0e0;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
`;

const ActionIcon = styled.div`
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.view {
    color: #17a2b8;
    background: rgba(23, 162, 184, 0.1);
    
    &:hover {
      background: #17a2b8;
      color: white;
    }
  }
  
  &.edit {
    color: #ffc107;
    background: rgba(255, 193, 7, 0.1);
    
    &:hover {
      background: #ffc107;
      color: white;
    }
  }
  
  &.delete {
    color: #dc3545;
    background: rgba(220, 53, 69, 0.1);
    
    &:hover {
      background: #dc3545;
      color: white;
    }
  }
`;

const EmptyState = styled(TableCell)`
  color: #6c757d;
  font-style: italic;
  padding: 3rem 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${props => {
    switch(props.status?.toLowerCase()) {
      case 'active':
        return `
          background: rgba(40, 167, 69, 0.1);
          color: #28a745;
        `;
      case 'inactive':
        return `
          background: rgba(108, 117, 125, 0.1);
          color: #6c757d;
        `;
      default:
        return `
          background: rgba(108, 117, 125, 0.1);
          color: #6c757d;
        `;
    }
  }}
`;

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const WarningIcon = styled.div`
  color: #dc3545;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h5`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ModalText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const EmployeeName = styled.span`
  font-weight: 600;
  color: #dc3545;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.cancel {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
  
  &.delete {
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
    }
  }
`;

const EmployeeList = ({ onView, onEdit, onAdd }) => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    employee: null
  });

  // Fetch all employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/employees/`);
        setEmployees(res.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employees");
      }
    };
    fetchEmployees();
  }, []);

  const openDeleteModal = (emp) => {
    setDeleteModal({
      isOpen: true,
      employee: emp
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      employee: null
    });
  };

  const handleDelete = async () => {
    if (!deleteModal.employee) return;

    try {
      await axios.delete(`http://localhost:3009/api/employees/delete/${deleteModal.employee.id}`);
      toast.success("Employee Deleted Successfully", { position: "top-right", duration: 2000 });
      setEmployees((prev) => prev.filter((emp) => emp.id !== deleteModal.employee.id));
      closeDeleteModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete employee", { position: "top-right", duration: 2000 });
      closeDeleteModal();
    }
  };

  // Filter search
  const filtered = employees.filter((e) =>
    e.employee_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Container>
        <Header>
          <Title>Employee List</Title>
          <AddButton onClick={onAdd}>
            <FaPlus />
            Add Employee
          </AddButton>
        </Header>

        {/* Search bar */}
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search employees by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>

        {/* Table */}
        <TableContainer className="table-responsive">
          <Table>
            <TableHeader>
              <tr>
                <th>Employee</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Project</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </TableHeader>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((emp) => (
                  <TableRow key={emp.id}>
                    <EmployeeCell>
                      {emp.image ? (
                        <Avatar 
                          src={`http://localhost:3009/uploads/${emp.image}`}
                          alt={emp.employee_name}
                        />
                      ) : (
                        <AvatarPlaceholder>
                          {emp.employee_name.charAt(0).toUpperCase()}
                        </AvatarPlaceholder>
                      )}
                      <span>{emp.employee_name}</span>
                    </EmployeeCell>

                    <TableCell>{emp.employee_id}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>{emp.project}</TableCell>
                    <TableCell>{emp.type}</TableCell>
                    <TableCell>
                      <StatusBadge status={emp.status}>
                        {emp.status}
                      </StatusBadge>
                    </TableCell>

                    {/* Action icons */}
                    <TableCell>
                      <ActionContainer>
                        <ActionIcon 
                          className="view" 
                          onClick={() => onView(emp)}
                          title="View Employee"
                        >
                          <FaEye />
                        </ActionIcon>
                        <ActionIcon 
                          className="edit" 
                          onClick={() => onEdit(emp)}
                          title="Edit Employee"
                        >
                          <FaEdit />
                        </ActionIcon>
                        <ActionIcon 
                          className="delete" 
                          onClick={() => openDeleteModal(emp)}
                          title="Delete Employee"
                        >
                          <FaTrash />
                        </ActionIcon>
                      </ActionContainer>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <EmptyState colSpan="8">
                    {search ? "No employees found matching your search." : "No employees found."}
                  </EmptyState>
                </TableRow>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </Container>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <ModalOverlay onClick={closeDeleteModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <WarningIcon>
              <FaExclamationTriangle />
            </WarningIcon>
            <ModalTitle>Delete Employee</ModalTitle>
            <ModalText>
              Are you sure you want to delete <EmployeeName>{deleteModal.employee?.employee_name}</EmployeeName>? 
              This action cannot be undone.
            </ModalText>
            <ButtonGroup>
              <ModalButton className="cancel" onClick={closeDeleteModal}>
                No, Cancel
              </ModalButton>
              <ModalButton className="delete" onClick={handleDelete}>
                Yes, Delete
              </ModalButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default EmployeeList;