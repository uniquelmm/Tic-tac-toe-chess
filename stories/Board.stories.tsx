import { storiesOf } from "@storybook/react";

import React, { useState } from "react";

import { Board } from "../src/components/Board";
import { handleClick } from "../src/components/Game/Game";
const stories = storiesOf("Game", module);
const [stepNumber, setStepNumber] = useState(0);
stories.add("Board", () => {
  return (
    <>
      <Board value={history[stepNumber].squares} onClick={handleClick} />;
    </>
  );
});
