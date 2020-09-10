/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";

import { useGameWinner } from "../hooks/useGameWinner";
import { Board } from "./Board";
interface GameProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Status = styled.div`
  margin: 18px 0;

  text-align: center;
`;

const WrapperGame = styled.div`
  color: #fff;
`;

const GameBoard = styled.div`
  color: #fff;
`;

const GameInfo = styled.div`
  color: #fff;
`;

const GameIndex = styled.ol`
  color: #fff;
`;

// 棋盘
export const Game: FC<GameProps> = () => {
  // 棋盘数组
  const [values, setValues] = useState(Array(9).fill(null));
  // 声明第几步
  const [stepNumber, setStepNumber] = useState(0);
  // 记录从开始到进行的这一步
  const [history, setHistory] = useState(values);
  // 方格上方的文字
  const [status, setStatus] = useState("Next player:X");
  // 用来判断切换X和O的
  const [next, setNext] = useState(true);

  // 方格的点击事件
  const handleClick = useCallback(
    (index) => {
      // stepHistory 储存第一次的记录和最后的记录
      const stepHistory = history.slice(0, stepNumber + 1);

      // 记录历史中当前的数据记录
      // const current = stepHistory[stepHistory.length - 1];
      // 通过使用 .slice() 方法创建了数组的一个副本，而不是直接修改现有的数组。
      const newValues = values.slice();
      newValues[index] = next ? " X" : " O";

      setValues(newValues);
      const newNext = !next;

      setNext(newNext);

      // if (handleJumpClick(newValue) || newValue[index]) {
      //   return;
      // }

      // 记录历史走到第几步
      // concat()此方法不会更改现有数组，但会返回一个新数组，其中包含联接数组的值。
      // const newHistory = history.concat([newValue]);
      setHistory(stepHistory.concat([newValues]));
      const newStepNumber = stepHistory.length;
      setStepNumber(newStepNumber);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const winner = useGameWinner(newValues);

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
    [history, next, status, stepNumber, values]
  );

  // 按钮只能点击一次
  // 赢了或结束不能点击
  // 返回正确的步数
  // 初始的move要正确

  // ”Go to move #和“ "Go to game start"按钮点击事件
  const handleJumpClick = useCallback((step) => {
    // 点击返回原始那一步,,将newStepNumber的目前第几步赋给step

    /// const newStepNumber = step;

    const newNext = step % 2 === 0;
    setNext(newNext);
  }, []);

  // 点击方格后生成Go to move # 按钮
  const moves = history.map((step, move) => {
    const historyMove = move ? "Go to move #" + move : "Go to game start";
    // console.log("move" + move);
    // console.log("history" + history);
    return (
      <li key={move}>
        <button onClick={() => handleJumpClick(move)}>{historyMove}</button>
      </li>
    );
  });

  return (
    <WrapperGame>
      <Status> {status} </Status>

      <GameBoard>
        <Board value={values} onClick={handleClick} />
      </GameBoard>

      <GameInfo>
        <GameIndex>{moves}</GameIndex>
      </GameInfo>
    </WrapperGame>
  );
};
