import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import styled from "styled-components";

const HeaderBody = styled.div`
  display: flex;
  gap: 2rem;
  padding-block: 2rem;
`;

export const Header = () => {
  return (
    <HeaderBody>
      <Link component={RouterLink} to="/">
        Заметки
      </Link>
      <Link component={RouterLink} to="/tags">
        Теги
      </Link>
      <Link component={RouterLink} to="/filter">
        Фильтр
      </Link>
    </HeaderBody>
  );
};
