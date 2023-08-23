exports.onFriendJoin=(socket,player) => {
    if (!player?.roomID) {
      return;
    }


    if (!roomParticipants.has(player.roomID)) {
      socket.join(player.roomID);
      roomParticipants.set(player.roomID, [{ ...player, socketId: socket.id }]);
   
   
    } else {
      const currentUsers = roomParticipants.get(player.roomID);

      const isPlayerInRoom = currentUsers.some(
        (user) => user.Email === player.Email
      );
      if (!isPlayerInRoom && currentUsers.length < 2) {
       
        socket.join(player.roomID);
        currentUsers.push({ ...player, socketId: socket.id });

        roomParticipants.set(player.roomID, currentUsers);
        

        if (currentUsers.length === 2) {
          io.to(player.roomID).emit("playersInfo", {
            player1: currentUsers[0].Name,
            player2: currentUsers[1].Name,
          });
          io.to(player.roomID).emit("startGame", { players: currentUsers });
        }
      } else {
        socket.emit("alreadyInRoom");
      }
    }

   
  };

  exports.onRandomJoin= (socket,player) => {

    if (!player.roomID) {
      return;
    }
    
    waitingPlayersQueue.push({ ...player, socketId: socket.id });
  
    if (waitingPlayersQueue.length >= 2) {
      const player1 = waitingPlayersQueue.shift();
      const player2 = waitingPlayersQueue.shift();
      const roomID = uuid()
      player1.roomID = roomID;
      player2.roomID = roomID;
      io.to(player1.socketId).emit("matched",roomID)
      io.to(player2.socketId).emit("matched",roomID)

    }
  };


  exports