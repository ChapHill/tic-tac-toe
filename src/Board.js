import React from 'react';
import Square from './Square'

class Board extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            squares: Array(9).fill(null),
            xTurn: true
        }
    }

    

    handleClick(i) {
        const squares = this.state.squares.slice();

        if(this.winningCombos(squares) || squares[i]) {
            return;
        }

        if(this.state.xTurn) {
            squares[i] = 'X';
            this.setState({squares: squares});
        } else {
            squares[i] = 'O';
            this.setState({squares: squares});
        }
        this.setState({xTurn: !this.state.xTurn}); 
    }

    reset() {
        this.setState({squares: Array(9).fill(null)});
    }

    renderSquare(i) {
        return (
            <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
        )
    }

    winningCombos(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }

    render() {
        const winner = this.winningCombos(this.state.squares);
        let turn; 
        if(winner) {
            turn = winner + " is the winner!"
        } else if(!this.state.squares.includes(null) && !winner) {
            turn = "It's a draw!"
        } else {
            turn = "Current turn: " + (this.state.xTurn ? 'X' : 'O')
        }

        return (
            <div>
                <h1>Tic-Tac-Toe</h1>
                <h3>{turn}</h3>
                <div className="container">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}

                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}

                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="button-container">
                    <button className="button" onClick={this.reset()}>Reset Game</button>>
                </div>
            </div>
            
        )
    }
}

export default Board