import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import toast from "react-hot-toast";

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
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

const Title = styled.h4`
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormRow = styled.div`
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
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ImageSection = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  background: #007bff;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const EditEmployee = ({ employee, onBack, onSave }) => {
  const [form, setForm] = useState({
    employee_id: "",
    employee_name: "",
    department: "",
    designation: "",
    project: "",
    type: "",
    status: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch single employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/employees/${employee.id}`
        );
        setForm(res.data);
        if (res.data.image) {
          setImagePreview(`${process.env.REACT_APP_BASE_URL}/uploads/${res.data.image}`);
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
        toast.error("Failed to load employee data");
      }
    };
    if (employee?.id) fetchEmployee();
  }, [employee]);

  //input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      });
      if (newImage) formData.append("image", newImage);

      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/employees/update/${employee.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Employee details updated successfully!", {
        position: "top-right",
        duration: 2000
      });
      onSave();
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <BackButton onClick={onBack}>
        ← Back
      </BackButton>

      <Card>
        <Title>Edit Employee</Title>
        
        <Form onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <ImageSection>
            <Avatar
              src={imagePreview || "https://via.placeholder.com/120?text=No+Image"}
              alt="Employee"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageSection>

          <FormRow>
            <FormGroup>
              <Label>Employee ID</Label>
              <Input
                type="text"
                name="employee_id"
                value={form.employee_id || ""}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Employee Name</Label>
              <Input
                type="text"
                name="employee_name"
                value={form.employee_name || ""}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Department</Label>
              <Input
                type="text"
                name="department"
                value={form.department || ""}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Designation</Label>
              <Input
                type="text"
                name="designation"
                value={form.designation || ""}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Project</Label>
              <Input
                type="text"
                name="project"
                value={form.project || ""}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Type</Label>
              <Select
                name="type"
                value={form.type || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
                <option value="Intern">Intern</option>
              </Select>
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label>Status</Label>
              <Select
                name="status"
                value={form.status || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Contract">Contract</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </FormGroup>
            <FormGroup>
              {/* Empty div to maintain grid layout */}
            </FormGroup>
          </FormRow>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
};

export default EditEmployee;