import React, { Component } from 'react';
import './App.scss';
import {Board} from './components/Board';

class App extends Component {
	render() {
		return (
			<div>
				<div className="App">
					<header className="App-header">
						
						<h1 className="App-title">
							<em>Game Of Life</em>
						</h1>
					</header>
				</div>
				<Board />
			</div>
		);
	}
}

export default App;
