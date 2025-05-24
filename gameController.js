exports.playSlots = async (req, res) => {
  const { bet } = req.body;
  if (!bet || bet <= 0) return res.status(400).json({ msg: 'Invalid bet amount' });

  try {
    const user = await getUserAndCheckBalance(req.user, bet);

    const symbols = ['🍒', '🍋', '🍇', '⭐', '🔔', '7️⃣'];
    const grid = [];

    // Generate 3x3 grid
    for (let i = 0; i < 3; i++) {
      grid[i] = [];
      for (let j = 0; j < 3; j++) {
        grid[i][j] = symbols[Math.floor(Math.random() * symbols.length)];
      }
    }

    // Check for row wins
    let winLines = 0;
    for (let row of grid) {
      if (row[0] === row[1] && row[1] === row[2]) {
        winLines++;
      }
    }

    const win = winLines * bet * 3; // 3x multiplier per winning row

    if (win > 0) {
      user.balance += win;
    } else {
      user.balance -= bet;
    }

    await user.save();
    res.json({
      grid,
      winLines,
      outcome: win > 0 ? 'win' : 'lose',
      amount: win > 0 ? win : -bet,
      newBalance: user.balance,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

