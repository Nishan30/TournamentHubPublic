// pages/api/socket.ts
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../../types/next';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';
import dbConnect from '@/lib/mongodb';
import TournamentChat from '@/models/tournamentChatModel';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO');

    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/chat/socket_io',
    });

    // Attach Socket.IO server to Next.js socket server response
    res.socket.server.io = io;

    // Socket.IO server event handling
    io.on('connection', (socket) => {
      console.log('New client connected', socket.id);

      socket.on('joinTournament', async (tournamentId: string) => {
        socket.join(tournamentId);
        console.log(`Socket ${socket.id} joined tournament ${tournamentId}`);

        // Fetch existing messages and send to the client
        await dbConnect();
        const chat = await TournamentChat.findOne({ tournamentId });
        if (chat) {
          socket.emit('initialMessages', chat.messages);
        } else {
          socket.emit('initialMessages', []);
        }
      });

      socket.on('sendMessage', async (data: { tournamentId: string; message: any }) => {
        const { tournamentId, message } = data;
        console.log(`Message received:`, message);

        // Save the message to MongoDB
        await dbConnect();

        let chat = await TournamentChat.findOne({ tournamentId });
        if (!chat) {
          chat = new TournamentChat({ tournamentId, messages: [] });
        }

        chat.messages.push(message);
        await chat.save();

        // Emit the new message to clients in the tournament room
        io.to(tournamentId).emit('newMessage', message);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
      });
    });
  }

  res.end();
}