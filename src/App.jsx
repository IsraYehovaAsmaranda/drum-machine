import React from "react";
import DrumMachine from "./features/DrumMachine";
import toggleBank from "./redux/action/bankAction";
import { connect, Provider } from "react-redux";
import store from "./redux/store";

const mapToStateProps = (state) => ({
  bank: state.bank,
});

const mapToDispatchProps = (dispatch) => ({
  toggleBank: () => dispatch(toggleBank()),
});

const Container = connect(mapToStateProps, mapToDispatchProps)(DrumMachine);

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

export default App;
