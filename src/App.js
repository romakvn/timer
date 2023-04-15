import { Container } from "react-bootstrap";
import Display from "./components/Display";
import { getTotal } from "./services/recordService";
import { useState, useEffect } from "react";

function App() {
  const [total, setTotal] = useState(null)

  useEffect(async() => {
      try {
          const res = await getTotal()
          setTotal(res.total)
          console.log(res.total, "******")
      } catch (error) {
          console.log(error)
      }
  }, [])

  return (
    <div className="App">
      <Container>
        <h1>Header</h1>
        <h2>Total: {total}</h2>
        <Display />
      </Container>
    </div>
  );
}

export default App;
