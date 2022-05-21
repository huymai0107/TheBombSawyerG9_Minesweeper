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
  