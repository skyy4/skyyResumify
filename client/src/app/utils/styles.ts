import styled from "styled-components";

export const StyledLabel = styled.label`
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  display: block;
`;

export const StyledInput = styled.input`
  background-color: rgba(30, 41, 59, 0.8);
  color: #f8fafc;
  width: 100%;
  padding: 0.7rem 0.875rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

export const StyledTextArea = styled.textarea`
  background-color: rgba(30, 41, 59, 0.8);
  color: #f8fafc;
  width: 100%;
  padding: 0.7rem 0.875rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  min-height: 6rem;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;