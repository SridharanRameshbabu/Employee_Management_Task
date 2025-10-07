import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: #6c757d;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  cursor: pointer;
  
  &:hover {
    background: #5a6268;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const EmployeeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f0f0f0;
`;

const AvatarPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #6c757d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  border: 3px solid #f0f0f0;
`;

const EmployeeName = styled.h4`
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const EmployeeId = styled.p`
  color: #666;
  margin: 0.25rem 0 0 0;
  font-size: 1rem;
`;

const DetailGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f5f5f5;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #555;
`;

const DetailValue = styled.span`
  color: #333;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  
  ${props => {
    switch(props.status?.toLowerCase()) {
      case 'active':
        return `
          background: #d4edda;
          color: #155724;
        `;
      case 'contract':
        return `
          background: #fff3cd;
          color: #856404;
        `;
      case 'inactive':
        return `
          background: #f8d7da;
          color: #721c24;
        `;
      default:
        return `
          background: #e2e3e5;
          color: #383d41;
        `;
    }
  }}
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
  margin-top: 2rem;
`;

const ErrorText = styled.p`
  text-align: center;
  color: #dc3545;
  margin-top: 2rem;
`;

const ViewEmployee = ({ employee, onBack }) => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/employees/${employee.id}`);
        setEmployeeData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setLoading(false);
      }
    };

    if (employee.id) {
      fetchEmployee();
    }
  }, [employee.id]);

  if (loading) return <LoadingText>Loading employee details...</LoadingText>;
  if (!employeeData) return <ErrorText>Employee not found</ErrorText>;

  return (
    <Container>
      <BackButton onClick={onBack}>
        ← Back to List
      </BackButton>

      <Card>
        <EmployeeHeader>
          {employeeData.image ? (
            <Avatar
              src={`http://localhost:3009/uploads/${employeeData.image}`}
              alt={employeeData.employee_name}
            />
          ) : (
            <AvatarPlaceholder>
              {employeeData.employee_name.charAt(0).toUpperCase()}
            </AvatarPlaceholder>
          )}
          <div>
            <EmployeeName>{employeeData.employee_name}</EmployeeName>
            <EmployeeId>ID: {employeeData.employee_id}</EmployeeId>
          </div>
        </EmployeeHeader>

        <DetailGrid>
          <DetailItem>
            <DetailLabel>Department</DetailLabel>
            <DetailValue>{employeeData.department}</DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>Designation</DetailLabel>
            <DetailValue>{employeeData.designation}</DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>Project</DetailLabel>
            <DetailValue>{employeeData.project || "Not assigned"}</DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>Type</DetailLabel>
            <DetailValue>{employeeData.type}</DetailValue>
          </DetailItem>

          <DetailItem>
            <DetailLabel>Status</DetailLabel>
            <StatusBadge status={employeeData.status}>
              {employeeData.status}
            </StatusBadge>
          </DetailItem>
        </DetailGrid>
      </Card>
    </Container>
  );
};

export default ViewEmployee;