import { Server, Socket } from "socket.io"

let io; // server bnaya yha

export function initSocket(httpServer){
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    console.log("socket io server is running")

    io.on("connection", (socket)=>{
        console.log("A user connected: " + socket.id)
    })
}

export function getIO(){ // is function me ham sirf io ko return krenge or kuch basic check lagaye h
    if(!io){  // check lagaya h socket io connect hua h ki nhi
        throw new Error("Socket.io not initialized")
    }
    return io
}