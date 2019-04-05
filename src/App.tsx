import * as React from 'react';
import styled from 'styled-components';
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
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IState {
  output: string;
  input: string;
}
type Example = { usage: string; example: string; description: string };
const examples: Example[] = [
  {
    usage: '(A|B)\\d',
    example: 'A4',
    description: 'A判、B判',
  },
  {
    usage: 'meishi|名刺|namecard',
    example: 'meishi',
    description: '名刺サイズ',
  },
  {
    usage: '[size] (\\d)dpi',
    example: 'A4 350dpi',
    description: 'ピクセルに変換',
  },
  {
    usage: '[size] (nuritashi|bleed|塗り足し)3',
    example: 'meishi nuritashi3',
    description: '塗り足しを追加',
  },
];
class App extends React.Component<{}, IState> {
  public state = { output: '', input: '' };

  public render() {
    const { output, input } = this.state;
    return (
      <Main>
        <Form>
          <Input
            type="text"
            value={input}
            placeholder="A4 350dpi"
            onChange={this.onChangeHandle}
          />
        </Form>
        <P>{output}</P>
        <p>いい感じに解析します</p>
        <table>
          <thead>
            <tr>
              <th>使い方</th>
              <th>意味</th>
            </tr>
          </thead>
          <tbody>
            {examples.map(({ usage, example, description }) => (
              <tr>
                <td>{usage}</td>
                <td>{example}</td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Main>
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
