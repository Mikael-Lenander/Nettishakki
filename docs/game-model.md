# Game Model

The chess game logic is implemented with an object oriented approach. Here is the class structure with the most important propetries and methods:

```mermaid
classDiagram
    class GameController {
        games: ActiveGame
        disconnections: Dictionary[username, timeoutId]
        find(gameId)
        new(game)
        disconnect(username)
        reconnect(username)
    }
    class ActiveGame {
        id: string
        game: Game
        players: Player[]
        isOn()
        offerDraw(username)
        declineDraw()
    }
    class Timer {
        timeLeft: number
        increment: number
        start()
        stop()
        tick()
    }
    class Game {
        board: Board
        turn: string
        isCheck: boolean
        isOver()
        getMoves(piece)
        makeMove(oldPos, newPos)
    }
    class Board {
        board: Piece[][]
        moves: Move[]
        movePiece(oldPos, newPos)
        inCheck(color)
    }
    class Pos {
        x: number
        y: number
        distance(other)
        equals(other)
        squaresBetween(other)
    }
    class Piece {
        name: string
        pos: Pos
        color: string
        abstract validMoves(board)
        abstract controlledSquares(board)
    }
    <<abstract>> Piece
    class LongRangePiece {
        validMoves(board)
        controlledSquares(board)
    }
    <<abstract>> LongRangePiece
    class Bishop
    class King {
        isCastleMove(move)
    }
    class Knight
    class Pawn {
        isEnPassantMove(move, board)
        isPromotionMove(move)
    }
    class Queen
    class Rook
    class Move {
        pieceName: string
        pieceColor: string
        oldPos: Pos
        newPos: Pos
    }
    class Player {
        username: string
        color: string
        isAuthenticated: string
        drawOffered: string
        timer: Timer
    }
    GameController "1" --> "0..*" ActiveGame
    ActiveGame "1" --> "0..2" Player
    ActiveGame "0..1" --> "1" Game
    Player "1" --> "1" Timer
    Game "1" --> "1" Board
    Board "1" --> "0..*" Move
    Board "1" --> "2..*" Piece
    Piece "1" --> "1" Pos
    Piece <|-- LongRangePiece
    LongRangePiece <|-- Queen
    LongRangePiece <|-- Rook
    LongRangePiece <|-- Bishop
    Piece <|-- King
    Piece <|-- Knight
    Piece <|-- Pawn
```

## GameController

GameController is used as a singleton object. It has a list of all the active games, and a dictionary of the users that have disconnected. When a user disconnects, a timeout is started. If the user does not reconnect, the game is ended and the disconnected player loses.

## ActiveGame

ActiveGame is a wrapper class for a Game object. It contains the game id, the game object, and the players. It is initialized when a player creates a new game, and is removed when the game is over.

## Game

Game is the main class that stores the chess game's state i.e. the board, which player's turn it is, and if the game is over. It has methods to get the possible moves for a piece, and to make a move. Game does not have a reference to the players, it only knows which color has the next turn.

## Player

Player is assigned to ActiveGame. It represents a logged in user or a guest that is playing a game. It contains the username, the color of the player, and a Timer object.

## Timer

Timer is used to keep track of the time left for each player. It has an increment and a timeLeft property that is updated every second.

## Board

Board has a 2D array of Pieces, which are located in the array according to where they are in the chess board. It has a list of all the moves that have been made, and a method to move a piece. Board is assigned to Game.

## Move

Move is an object that stores the information about a move. It contains the name of the piece that was moved, the color of the piece, the old position, and the new position.

## Piece

Pieces are stored in the Board array. They are aware of their position, their color and what kind of pieces they are e.g. pawn, knight. They have methods to get the valid moves and the controlled squares. The valid moves are the squares that the piece can move to, and the controlled squares are the squares that the piece can attack. Piece is an abstract class that is extended by all the different types of pieces.

## LongRangePiece

LongRangePiece is an abstract class that is extended by pieces that can move in a straight line. Rook, Queen and Bishop are LongRangePieces. These pieces behave in a similar way, so they share the same logic for calculating the valid moves and the controlled squares.

## Pos

Pos represents a location in the chess board. It has an x and a y coordinate, and it has lots of utility methods, such as returning the distance or the squares between two positions.