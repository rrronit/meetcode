const express = require("express");
const http = require("http");
const app = express();
const dotenv = require("dotenv").config();

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const { v4: uuid } = require("uuid");
const socketIO = require("socket.io");
const Error = require("./Middleware/Error");

const io = new socketIO.Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

const db = require("./config/db");
db();
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./Routes/UserRoutes");
const codeRoute = require("./Routes/EditorRoutes");
const { getRandomProblem } = require("./Controller/EditorController");

app.use(Error);
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoute);
app.use("/problem", codeRoute);

const roomParticipants = new Map();

let waitingPlayersQueue = [];
const PlayersScore = new Map();

io.on("connection", (socket) => {
  socket.on("friend:joinRoom", async (player) => {
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

          const problem = await getRandomProblem();

          io.to(player.roomID).emit("startGame", problem);
        }
      }
    }
  });
  socket.on("submit", (data) => {
    socket.join(data.roomID);
    if (!PlayersScore.has(data.roomID)) {
      PlayersScore.set(data.roomID, [data]);
    } else {
      const players = PlayersScore.get(data.roomID);
      players.push(data);
      PlayersScore.set(data.roomID, players);
      console.log(data);
      setTimeout(() => {
        io.to(data.roomID).emit("Score", players);
      }, 1000);
    }
  });

  socket.on("random:joinRoom", (player) => {
    if (!player.roomID) {
      return;
    }

    waitingPlayersQueue.push({ ...player, socketId: socket.id });

    if (waitingPlayersQueue.length >= 2) {
      const player1 = waitingPlayersQueue.shift();
      const player2 = waitingPlayersQueue.shift();
      const roomID = uuid();
      player1.roomID = roomID;
      player2.roomID = roomID;
      io.to(player1.socketId).emit("matched", roomID);
      io.to(player2.socketId).emit("matched", roomID);
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    waitingPlayersQueue = waitingPlayersQueue.filter(
      (players) => players.socketId !== socket.id
    );

    for (const [roomID, participants] of roomParticipants.entries()) {
      if (participants.socketId === socket.id) {
        if (roomParticipants.get(roomID).length === 1) {
          io.to(roomID).emit("opponentLeft");
        }
        if (roomParticipants.get(roomID).length === 0) {
          roomParticipants.delete(roomID);
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
