import React, { useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaUserPlus, FaUpload } from "react-icons/fa";
import styled from "styled-components";
import toast from "react-hot-toast";

const Container = styled.div`
  // padding: 2rem;
  background: #f8f9fa;
  // min-height: calc(100vh - 60px);
`;

const BackButton = styled.button`
  background: #6c757d;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: #5a6268;
    transform: translateX(-5px);
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h4`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    margin-left: 1rem;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #adb5bd;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FileInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::file-selector-button {
    display: none;
  }
`;

const UploadIcon = styled(FaUpload)`
  position: absolute;
  left: 1rem;
  color: #667eea;
  font-size: 1.1rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  grid-column: 1 / -1;
  justify-self: start;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ImagePreview = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
`;

const PreviewImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #e9ecef;
`;

const PreviewText = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
`;

const AddEmployee = ({ onBack, onSave }) => {
  const [form, setForm] = useState({
    employee_id: "",
    employee_name: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append("employee_id", form.employee_id);
      data.append("employee_name", form.employee_name);
      data.append("department", form.department);
      data.append("designation", form.designation);
      data.append("project", form.project);
      data.append("type", form.type);
      data.append("status", form.status);
      if (form.image) data.append("image", form.image);

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/employees/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Employee added successfully!", { position: "top-right" });
      if (onSave) onSave();
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee", { position: "top-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <BackButton onClick={onBack}>
        <FaArrowLeft />
        Back to Employee List
      </BackButton>

      <Card>
        <Title>
          <FaUserPlus />
          Add New Employee
        </Title>
        
        <Form onSubmit={handleSubmit}>
          {/* Employee ID */}
          <FormGroup>
            <Label>Employee ID *</Label>
            <Input
              type="text"
              name="employee_id"
              value={form.employee_id}
              onChange={handleChange}
              placeholder="Enter employee ID"
              required
            />
          </FormGroup>

          {/* Name */}
          <FormGroup>
            <Label>Employee Name *</Label>
            <Input
              type="text"
              name="employee_name"
              value={form.employee_name}
              onChange={handleChange}
              placeholder="Enter employee name"
              required
            />
          </FormGroup>

          {/* Department */}
          <FormGroup>
            <Label>Department *</Label>
            <Input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Enter department"
              required
            />
          </FormGroup>

          {/* Designation */}
          <FormGroup>
            <Label>Designation *</Label>
            <Input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="Enter designation"
              required
            />
          </FormGroup>

          {/* Project */}
          <FormGroup>
            <Label>Project</Label>
            <Input
              type="text"
              name="project"
              value={form.project}
              onChange={handleChange}
              placeholder="Enter project name"
            />
          </FormGroup>

          {/* Type */}
          <FormGroup>
            <Label>Type *</Label>
            <Select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Office">Office</option>
              <option value="Remote">Remote</option>
              <option value="Intern">Intern</option>
            </Select>
          </FormGroup>

          {/* Status */}
          <FormGroup>
            <Label>Status *</Label>
            <Select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Contract">Contract</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </FormGroup>

          {/* Employee Image */}
          <FormGroup className="full-width">
            <Label>Profile Image</Label>
            <FileInputContainer>
              <UploadIcon />
              <FileInput
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </FileInputContainer>
          </FormGroup>

          {/* Image Preview */}
          {imagePreview && (
            <ImagePreview>
              <PreviewImage src={imagePreview} alt="Preview" />
              <PreviewText>Image Preview</PreviewText>
            </ImagePreview>
          )}

          <SubmitButton type="submit" disabled={isSubmitting}>
            <FaUserPlus />
            {isSubmitting ? "Adding Employee..." : "Add Employee"}
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
};

export default AddEmployee;