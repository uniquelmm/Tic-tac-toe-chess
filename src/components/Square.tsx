import React, { FC } from "react";
import styled from "styled-components";

const SquareButton = styled.div`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 30px;
  font-weight: bold;
  line-height: 60px;
  height: 60px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 60px;
`;

interface SquareProps {
  value: "O" | "X" | null;
  onClick: () => void;
}

// 单独的按钮
export const Square: FC<SquareProps> = ({ value, onClick }) => {
  return <SquareButton onClick={onClick}>{value}</SquareButton>;
};
