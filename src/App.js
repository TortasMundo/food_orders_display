import React, {Component} from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="OrderNo">#23</div>
        <div OrderDetails>
          Jamón (2) <br />
          Lomo (1) <br />
          Especial (1) <br />
          Refrescos (4) <br />
        </div>
      </div>
    );
  }
}

export default App;
