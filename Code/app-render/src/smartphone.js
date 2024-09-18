 
import React, { useState } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const App = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerScores, setPlayerScores] = useState({ 'X': 0, 'O': 0, draws: 0 });

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = () => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handlePress = (index) => {
    if (board[index] || checkWinner()) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const winner = checkWinner();
    if (winner) {
      Alert.alert('Game Over', `${winner} wins!`);
      setPlayerScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
      resetGame();
    } else if (!newBoard.includes(null)) {
      Alert.alert('Draw', 'It\'s a draw!');
      setPlayerScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      resetGame();
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} onPress={() => handlePress(index)} style={styles.cell}>
            <Text style={[styles.text, cell === 'X' ? styles.xStyle : styles.oStyle]}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.scoreboard}>
        <Text style={styles.scoreText}>Player X: {playerScores['X']} Wins</Text>
        <Text style={styles.scoreText}>Player O: {playerScores['O']} Wins</Text>
        <Text style={styles.scoreText}>Draws: {playerScores.draws}</Text>
      </View>
      <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
        <Text style={styles.resetText}>Reset Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 200,
  },
  cell: {
    width: 66.67,
    height: 66.67,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 24,
  },
  xStyle: {
    color: 'red',
  },
  oStyle: {
    color: 'blue',
  },
  scoreboard: {
    marginTop: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 5,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  resetText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
