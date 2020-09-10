import React, { FC } from "react";
import styled from "styled-components";

const SquareButton = styled.button`
  width: 50px;
  height: 50px;
  margin-top: -5px;
  margin-left: -1px;
  padding: 0;

  text-align: center;

  border: 1px solid #999;
  background: #fff;

  font-size: 66px;
  line-height: 50px;

  &:focus {
    outline: none;
  }
`;

interface SquareProps {
  value: "O" | "X" | null;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

// 单独的按钮
export const Square: FC<SquareProps> = ({ value, onClick }) => {
  return <SquareButton onClick={onClick}>{value}</SquareButton>;
};
