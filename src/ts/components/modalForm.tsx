import styled from "styled-components";
import { TextField, Button } from "@mui/material";

export const ModalForm = styled.form`
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  width: 100%;
  max-width: 30rem;
  padding: 2rem;
  display: grid;
  gap: 1rem;
`;

export const ModalFormInput = styled(TextField)`
  justify-self: stretch;
`;

export const ModalFormButton = styled(Button)`
  justify-self: end;
`;
