## Sudoku

<img width="300" alt="Bildschirmfoto 2023-06-17 um 10 29 51 PM" src="https://github.com/Jimmywu987/sudoku/assets/65562227/b53a5ed3-5ec6-44ea-925f-79a011940100">

### How this is built

#### Generate sudoku
1. An array of 9 * 9 empty string is created at first to be the base.
2. when generate a puzzle of sudoku, first a record for each 81 grids will be generated for tracking. <-- each grid has three arrays for tracking (horizontally, vertically and within the 3 * 3 square) that each array will have numbers from 1 to 9.
   etc
  <br/>
   <p align="center">The array of indexes of the board with all combination (horizontally, vertically and within the 3 * 3 square) </p>
   <img width="300" alt="Bildschirmfoto 2023-06-17 um 10 28 24 PM" src="https://github.com/Jimmywu987/sudoku/assets/65562227/f70db8c4-b160-4b61-8d59-410e405fb5b0">
 <br/>
 <p align="center">The three arrays of indexes position of each grid correspond to the array of indexes above</p>
<img width="300" alt="Bildschirmfoto 2023-06-17 um 10 30 30 PM" src="https://github.com/Jimmywu987/sudoku/assets/65562227/d7994323-26f1-447e-9cf7-33b8cbc88171">
 <br/>
 
3. A function loops 9 * 9 times to randomly draw a number of 1 to 9 from one of the three arrays then remove the same number from these three arrays of the same grid, then save the number into the grid.

4. At the end, it will check if there is an empty string left in the 9 * 9 grids. If there is, the function will called itself to draw again, if the grids are all filled with numbers. It means, it is a complete sudoku, and it is ready for playing.
  
5. The complete sudoku will be stored in a state for whose who clicks on revealing the answer later.

<img width="300" alt="Bildschirmfoto 2023-06-17 um 10 38 54 PM" src="https://github.com/Jimmywu987/sudoku/assets/65562227/aac9cf62-c8de-4ccc-976f-74e9ef4573ee">

6. The game will check the difficulty for how many it will hide the numbers from the board. (easy means hide less and vice versa).

#### Solve the puzzle
1. User can input the answer on each empty grid, when the user clicks on solve button or completely fill the board. A function for checking if the sudoku is solvable, is triggered.
2. As mentioned above, each grid is being tracked with three arrays, a function loops 81 times to check each grid's three arrays (horizontal, vertical, 3 * 3 square), if there is any duplicate number within the array of 1 to 9.
3. If yes, then classify this puzzle is unsolvable or else the hidden numbers will all be shown.

<img width="300" alt="Bildschirmfoto 2023-06-17 um 10 52 11 PM" src="https://github.com/Jimmywu987/sudoku/assets/65562227/e3e7f8e3-aeee-4135-a44f-cec742975dcd">


### Tech tools

<a href="https://www.typescriptlang.org/"><img src="https://camo.githubusercontent.com/ff660f3b34106793e1a8008592156f3127d8465adc82e103b9f2e0ce012c70ec/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f747970657363726970742e737667" alt="typescript" width="40" height="40"></a>
<a href="https://reactjs.org/" target="_blank"> <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" alt="react" width="40" height="40"/> </a>
<a href="https://tailwindcss.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a>



