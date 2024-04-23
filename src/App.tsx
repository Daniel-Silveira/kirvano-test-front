import { useState } from "react";
import Datepicker from "./components/Datepicker/DatepickerView";

function App() {
  const [state, setState] = useState({});
  console.log(state)
  return (
    <>
      <Datepicker
        value={state}
        onChange={(value) => setState(value)}
        showFooter
        showShortcuts
        disabled
      />
    </>
  );
}

export default App;
