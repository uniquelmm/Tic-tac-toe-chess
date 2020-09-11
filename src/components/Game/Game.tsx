import React, { FC, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import { calculateWinner } from "../../utils/calculateWinner";
import { Board } from "../Board";
interface GameProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Status = styled.div`
  margin: 18px 0;

  text-align: center;
`;

// 棋盘
export const Game: FC<GameProps> = () => {
  // 声明第几步
  const [stepNumber, setStepNumber] = useState(0);
  // 记录从开始到进行的这一步
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  // 方格上方的文字
  const [status, setStatus] = useState("Next player:X");
  // 用来判断切换X和O的
  const [xNext, setXNext] = useState(true);

  // 方格的点击事件
  const handleClick = useCallback(
    (index) => {
      // stepHistory 储存第一次和到的那步之间的记录
      const stepHistory = history.slice(0, stepNumber + 1);

      // 取到当前的方格数据数组
      const squares = stepHistory[stepHistory.length - 1].squares.slice();

      if (calculateWinner(squares) || squares[index]) {
        return;
      }

      // 下一步 的值
      squares[index] = xNext ? "X" : "O";

      // 将最新的值添加到history数组中
      setHistory(stepHistory.concat({ squares }));

      setStepNumber(stepHistory.length);

      setXNext(!xNext);

      const winner = calculateWinner(squares);

      // 判断方格上方的文字
      if (status === "Next player:X") {
        setStatus("Next player:O");
      } else {
        setStatus("Next player:X");
      }
      if (winner) {
        setStatus("Winner:" + winner);
      }
    },
    [history, stepNumber, xNext, status]
  );

  // ”Go to move #和“ "Go to game start"按钮点击事件
  const handleJumpClick = useCallback((step) => {
    // 点击返回原始那一步,,将newStepNumber的目前第几步赋给step
    setStepNumber(step);
  }, []);

  // 点击方格后生成Go to move # 按钮
  console.log("history22" + history);
  const moves = useMemo(
    () =>
      history.map((step, move) => {
        const historyMove = move ? `Go to move #${move}` : "Go to game start";

        return (
          <li key={move}>
            <button onClick={() => handleJumpClick(move)}>{historyMove}</button>
          </li>
        );
      }),
    [handleJumpClick, history]
  );

  return (
    <>
      <Status> {status} </Status>

      <Board value={history[stepNumber].squares} onClick={handleClick} />

      <div>
        <ol>{moves}</ol>
      </div>
    </>
  );
};
