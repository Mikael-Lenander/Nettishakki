# Online chess

Full stack project 175 h

Page can be found [here](https://nettishakki.herokuapp.com/).

[working hours](docs/tuntikirjanpito.md)

## Instructions

To try the game quickly, open the page in two tabs. Press the "Create new game" button and a code will appear on the screen. You can enter the code to the other tab by pressing "Join game" first. You can of course also play against a friend.

For a logged in user, the games played will appear on the front page. To view the moves of a game, select the game first and then press the board that appears on the screen. For example, the user demouser with the password vahvasalasana has two games that can be viewed.

The page works at least with Chrome and Firefox. The page does not work on mobile devices.

## Project structure

- frontend: React, Redux
- backend: Socket.io, Express, PostgreSQL

The whole project is written in TypeScript. The chess logic and some types are located in the shared folder, since both frontend and backend use them.

## About the game

The game is a fully functional implementation of chess, except for the following rules:
- pawn is promoted automatically to queen
- draw only follows from stalemate and insufficient material

Main features:
- the game is played against human opponents
- it is possible to play with different time controls and you can resign and offer a draw
- for a logged in user, the game is saved to the database, so the player can view their games later