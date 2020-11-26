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

  renderSquare=(i,j)=>{
    return (
      <Squares 
        onClick={()=>this.props.onClick(i,j)} 
        squares={this.props.squares[i][j]}
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
          {this.renderSquare(0,0)}
          {this.renderSquare(0,1)}
          {this.renderSquare(0,2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(1,0)}
          {this.renderSquare(1,1)}
          {this.renderSquare(1,2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(2,0)}
          {this.renderSquare(2,1)}
          {this.renderSquare(2,2)}
        </div>
      </div>
    
    )
  }
}

class Game extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
      history:[{squares:[
        [null,null,null],
        [null,null,null],
        [null,null,null]
      ]}],
      isNext :true,
      stepNumber:0,
      row:[],
      col:[]
    }
  }

  handleClick=(i,j)=>{

    const history = this.state.history.slice(0,this.state.stepNumber+1);

    const current = history[history.length-1];
    const squares = current.squares.slice();
    
    if(calulateWinner(squares)){
      return;
    }    

    const a = squares[i].slice();
    a[j]= this.state.isNext ? 'X' : 'O';
    squares[i]=a;

    const row = this.state.row.slice();
    const col = this.state.col.slice();

    row.push(i);
    col.push(j)

    this.setState({
      history : history.concat([{squares:squares}]),
      isNext : !this.state.isNext,
      stepNumber: this.state.stepNumber+1,
      row: row,
      col: col
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

    const row = this.state.row

    const col = this.state.col;

    const moves = history.map((value, move)=>{

      const posX = row[move-1];
      const posY = col[move-1];
      const desc = move ? `Move to [${posX}][${posY}]` : 'Game start';
      return (
        <li key={move}>
          <button onClick={()=>this.jumpto(move)}>{desc}</button>
        </li>
      )
    })
    
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
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
  ]

  for(let i=0; i<lines.length; i++){
    const [a,b,c] = lines[i];
    const [ai ,aj] =a;
    const [bi ,bj] =b;
    const [ci ,cj] =c;
    if(squares[ai][aj]===squares[bi][bj] && squares[bi][bj]===squares[ci][cj]){

      return squares[ai][aj]
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

// const a = [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ]

// console.log(a[1][2])
