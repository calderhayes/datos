import * as React from 'react';
import {render} from 'react-dom';
import {Example1} from './example1';
import * as moment from 'moment';

moment.locale('en-CA');

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h1>Demo</h1>
        <Example1 />
      </div>
    );
  }
}

const rootHTMLElement = document.getElementById('app');

render(<App />, rootHTMLElement);
