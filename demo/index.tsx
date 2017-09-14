import * as React from 'react';
import {render} from 'react-dom';

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h1>HERE</h1>
      </div>
    );
  }
}

const rootHTMLElement = document.getElementById('app');

render(<App />, rootHTMLElement);
