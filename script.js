import {
  TILE_STATUSES, 
   createBoard,
   markTile,
   revealTile,
   checkWin,
   checkLose,
   remarkTile,
   getCount,
   setCount,
   getFlag,
   } from "./minesweeper.js"
 const BOARD_SIZE = 10
 const NUMBER_OF_MINES = 20
 let positions = []
 let state = []
  
  
 const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
 const boardElement = document.querySelector(".board")
 const minesLeftText = document.querySelector("[data-mine-count]")
 const messageText = document.querySelector(".subtext")
 let i = 0
  
 board.forEach(row => {
     row.forEach(tile => {
       boardElement.append(tile.element)
       tile.element.addEventListener("click", () => {
           revealTile(board,positions,tile)
           state[i] = getCount()
           console.log("state" + i +": " + state[i])
           i = i + 1
           setCount(0)
           checkGameEnd()
          
        
       })
       tile.element.addEventListener("contextmenu", e => {
         e.preventDefault()
         markTile(tile)
         listMinesLeft()
        
         })
        
     })
 })
 
function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)
   
    if (win || lose) {
      boardElement.addEventListener("click", stopProp, { capture: true })
      boardElement.addEventListener("contextmenu", stopProp, { capture: true })
    }
   
    if (win) {
      messageText.textContent = "You Win"
    }
    if (lose) {
      messageText.textContent = "You Lose"
      board.forEach(row => {
        row.forEach(tile => {
          if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
          if (tile.mine) revealTile(board, tile)
        })
      })
    }
  }
   
  function stopProp(e) {
    e.stopImmediatePropagation()
  }
  