import React, { FC, useCallback } from "react";
import styled from "styled-components";

import { Square } from "./Square";

const BoardWrapper = styled.div`
  text-align: center;
`;

const Boards = styled.div`
  color: #fff;
`;

const BoardRow = styled.div`
  color: #fff;
`;

interface BoardProps {
  value: ("O" | "X" | null)[];
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

// 九个小方格
export const Board: FC<BoardProps> = ({ onClick, value }) => {
  // 可点击方格
  const renderSquare = useCallback(
    (index) => {
      return <Square value={value[index]} onClick={() => onClick(index)} />;
    },
    [onClick, value]
  );
  return (
    <BoardWrapper>
      <Boards>
        <BoardRow>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </BoardRow>

        <BoardRow>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </BoardRow>

        <BoardRow>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </BoardRow>
      </Boards>
    </BoardWrapper>
  );
};
