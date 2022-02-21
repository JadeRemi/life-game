import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.scss';
import { Board } from './components/Board';

class App extends Component {
	render() {
		return (
			<div>
				<div className="App">
					<header className="App-header">
						
						<h1 className="App-title">
							Welcome to the <em>Game Of Life</em>
						</h1>
					</header>
				</div>
				<Board />
			</div>
		);
	}
}

export default App;
