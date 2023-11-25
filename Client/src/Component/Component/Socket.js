import socketIO from "socket.io-client";


const socket= socketIO(`https://meetcode.ronit.live`, {
    transport: ["websocket"],
  });      

export default socket