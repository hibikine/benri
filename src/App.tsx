import * as React from 'react';
import styled from 'styled-components';
import './App.css';
import calc from './calc';

const Form = styled.form`
  margin-top: 20px;
  font-size: 2rem;
`;
const Input = styled.input`
  font-size: 2rem;
`;
const P = styled.p`
  font-size: 2rem;
`;

interface IState {
  output: string;
  input: string;
}
class App extends React.Component<{}, IState> {
  public state = { output: '', input: '' };

  public render() {
    const { output, input } = this.state;
    return (
      <div className="App">
        <Form>
          <Input
            type="text"
            value={input}
            placeholder="A4 350dpi"
            onChange={this.onChangeHandle}
          />
        </Form>
        <P>{output}</P>
      </div>
    );
  }

  private onChangeHandle = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      input: e.currentTarget.value,
    });
    try {
      const output = calc(e.currentTarget.value);
      this.setState({ output });
    } catch (e) {
      // 無視
    }
  };
}

export default App;
