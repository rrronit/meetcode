import socketIO from "socket.io-client";


const socket= socketIO(`${import.meta.env.VITE_BASEURL}`, {
    transport: ["websocket"],
  });      

export default socket