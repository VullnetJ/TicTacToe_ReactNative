import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';

const FirstPlayer = "First Player";
const SecondPlayer = "Second Player";
class Banner extends React.Component {
  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerText}>First Player is with "X" symbol, and Second Player is with "O"</Text>
        <Text>{""}</Text>
        <Text style={styles.bannerText}>TicTacToe Exercise04</Text>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles.screen]}>
        <Board />
        <Banner></Banner>
      </View>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(9).fill(' '),
      FirstPlayer: true,
      whoWinn: FirstPlayer,
      freeze: false
    };
    this.theBoard = this.theBoard.bind(this);
    this.Restart = this.Restart.bind(this);
  }
  theWinner() {
    let board = this.state.board;
    if(board.reduce((acc, curr) => {return acc + curr}).trim().length <= 2) return;
    const possibleValues = ["X","O"];
    let winnerValue;
    possibleValues.forEach(value => {
       if(verifyR(board, value)) winnerValue = value;
       if(verifyC(board, value)) winnerValue = value;
       if(verifyD(board, value)) winnerValue = value;
    });
    if(winnerValue === possibleValues[0]) {
      this.setState({freeze: true});
      return possibleValues[0];
    }
    else if(winnerValue === possibleValues[1]) {
      this.setState({freeze: true});
      return possibleValues[1];
    }
    else if(board.every(value => value == "X" || value == "O")) {
      this.setState({freeze: true});
      return "equal";
    }
  }

  theBoard(index) {
    let validMove = this.state.board[index] == ' ';
    if(validMove) {
      this.setState(prevState => {
        let newBoard = prevState.board;
        newBoard[index] = prevState.FirstPlayer ? "X" : "O";
        return {
          board: newBoard,
          FirstPlayer: !prevState.FirstPlayer
        };
      });
    }
  }

  
  declareWinner(winner) {
    let theWinnerIs = "";
    if(winner == 'X') {
      theWinnerIs = "Player 1 has won";
    }
    else if(winner == 'O') {
      theWinnerIs = "Player 2 has won";
    }
    else if(winner == 'equal') {
      theWinnerIs = "No One Won";
    }
    else {
      theWinnerIs = this.state.FirstPlayer ? FirstPlayer : SecondPlayer;
    }

    this.setState({
      whoWinn: theWinnerIs
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.FirstPlayer != this.state.FirstPlayer) {
      this.declareWinner(this.theWinner());
    }
  }

  Restart() {
    this.setState({
      board: new Array(9).fill(' '),
      FirstPlayer: true,
      whoWinn: FirstPlayer,
      freeze: false
    });
  }

  render() {
    return (
        <View>
          <Declare whoWinn={this.state.whoWinn}/>
          <View style={styles.board}>
            {this.state.board.map((square, index) => <Square check={square} key={index} pos={index} press={!this.state.freeze && this.theBoard}/>)}
          </View>
          <Text style={styles.title}></Text>
          <Button  onPress={this.Restart} title="Restart Game" color='orangered' />
        </View>
    );
  }
}

function verifyR(board, value) {
  for(let i = 0; i < board.length; i = i + 3){
    if(value === board[i] && value === board[i + 1] && value === board[i + 2]) {
      return true;
    }
  }
  return false;
}

function verifyC(board, value) {
  for(let i = 0; i < board.length / 3; i++) {
    if(value === board[i] && value === board[i + 3] && value === board[i + 6]) {
      return true;
    }
  }
  return false;
}

function verifyD(board, value) {
  if(value === board[0] && value === board[4] && value === board[8]) {
    return true;
  }
  else if(value === board[2] && value === board[4] && value === board[6]) {
    return true;
  }
  return false;
}


function Declare(props) {
    return (
    <View style={styles.declaring}>
      <Text style={styles.declaringText}>{props.whoWinn}</Text>
    </View>
  );
}

function Square(props) {
    return (
      <TouchableHighlight style={styles.square} onPress={() => props.press && props.press(props.pos)}>
        <View style={styles.container}>
          <Text style={styles.mark}>{props.check}</Text>
        </View>
      </ TouchableHighlight>
    );
}

const styles = StyleSheet.create({
 
  container: {
    display: 'flex',
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'aquamarine'
  },

  board : {
    justifyContent:'center',
    backgroundColor:'orangered',
    height:290,
    width:290,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems:'center',

  },

  square: {
    width: '32.5%',
    height: '32.5%',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    backgroundColor:'orange',
  },

  mark: {
    fontSize: 33,
    fontWeight: 'bold',
    color: 'orangered'
  },

  declaring :{
    height: 50,
    backgroundColor:'tomato',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  declaringText: {
    fontSize: 35,
    textAlign: 'center',
    color:'white'
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    paddingTop: 10,
   
    marginTop: 20,
    marginBottom: -35,
    marginLeft: 80,
    marginRight: 80,
    borderWidth: 4,
    borderColor: 'blue',
  }, 
});