// import { render } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
class Squares extends React.Component{
  
  render(){
    return(
      <div className='square' onClick={this.props.onClick}>
        {this.props.squares}
      </div>
    )
  }
}

class Board extends React.Component{

  renderSquare=(i)=>{
    return (
      <Squares 
        onClick={()=>this.props.onClick(i)} 
        squares={this.props.squares[i]}
      />
    )
  }

  render(){

    return  (

      <div className='board'>
        <div className='status'>
          {this.props.status}
        </div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    
    )
  }
}

class Game extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      history:[{squares:Array(9).fill(null)}],
      isNext :true,
      stepNumber:0
    }
  }

  handleClick=(i)=>{

    const history = this.state.history.slice(0,this.state.stepNumber+1);

    const current = history[history.length-1];
    const squares = current.squares.slice();

    if(calulateWinner(squares)){
      return;
    }    

    squares[i] = this.state.isNext ? 'X' :'O'
    this.setState({
      history : history.concat([{squares:squares}]),
      isNext : !this.state.isNext,
      stepNumber: this.state.stepNumber+1
    })
  }

  jumpto=(move)=>{
    this.setState({
      stepNumber:move,
      isNext : move%2===0
    })
  }

  render(){

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;
    
    const winner = calulateWinner(squares);

    const status = winner ? ('Player:- '+winner+ ' Won') : (this.state.isNext ? 'Next Player:- X': 'Next Player:- O');

    const moves = history.map((value, move)=>{

      const desc = move ? `Move to ${move}` : 'Game start';
      return (
        <li key={move}>
          <button onClick={()=>this.jumpto(move)}>{desc}</button>
        </li>
      )
      
    })
    console.log(this.state.history);

    return(
      <div className='game'>
        
        <Board 
          squares={squares}
          onClick={this.handleClick}
          status={status}
        />

        <div className='moves'>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    )
  }
}

const calulateWinner=(squares)=>{
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,5],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a]===squares[b] 
    && squares[b]===squares[c] ){
      return squares[a];
    }
  }
}

ReactDom.render(<Game/>, document.getElementById('root'))

//!Important why immutabiltiy is important
/*
const d = [1,2,3,4]

const c = d;
c[2]=233;

console.log(c);
console.log(d)
*/