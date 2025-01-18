"use client";
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { SidebarLayoutArbiter } from '@/components/common/sidebarArbiter';
import { useTournament } from "@/context/tournamentContext";
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

interface Message {
  senderId: string;
  senderName: string;
  senderTitle: string;
  text: string;
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const { activeTournament } = useTournament();
  const user = useUser();

  if (!activeTournament || !user.user) {
    const currentPath = window.location.pathname;
    router.push(`/signin?redirect=${encodeURIComponent(currentPath)}?accountType=Arbiter`);
    return null;
  }

  const tournamentId = activeTournament.id;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  // Replace with actual user data from your authentication system
  const currentUser = {
    id: user.user?.uid as string, // Should be actual user ID
    name: user.user?.displayName as string, // Should be actual user name
    title: 'Arbiter', // Should be actual user title
  };

  const socketRef = useRef<typeof Socket | null>(null);

  // Ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!tournamentId) return;

    if (!socketRef.current) {
      socketInitializer();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leaveTournament', tournamentId);
        socketRef.current.off('initialMessages');
        socketRef.current.off('newMessage');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [tournamentId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const socketInitializer = async () => {
    await fetch('/api/chat/socket'); // Ensure the Socket.IO server is started

    const socket = io({
      path: '/api/chat/socket_io',
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      socket.emit('joinTournament', tournamentId);
    });

    socket.on('initialMessages', (initialMessages: Message[]) => {
      setMessages(initialMessages);
    });

    socket.on('newMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const message: Message = {
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderTitle: currentUser.title,
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };

    socketRef.current?.emit('sendMessage', { tournamentId, message });

    setInputMessage('');
  };

  // Function to get message style based on senderTitle
  const getMessageStyle = (senderTitle: Message['senderTitle']) => {
    switch (senderTitle) {
      case 'Organizer':
        return 'bg-purple-600';
      case 'Arbiter':
        return 'bg-red-600';
      case 'Participant':
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-1/7 border-r border-neutral-800">
        <SidebarLayoutArbiter activeItem="Messaging" />
      </aside>
      <div className="flex-1 flex-col pl-10 pr-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">Tournament Chat</h1>

          <Card className="shadow-xl overflow-hidden">
            <div className="flex h-[600px]">
              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                <CardHeader className="border-b border-white-200">
                  <h2 className="text-xl font-semibold">Tournament Chat Room</h2>
                </CardHeader>
                <ScrollArea className="flex-1 p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        message.senderId === currentUser.id ? 'items-end' : 'items-start'
                      }`}
                    >
                      {message.senderId !== currentUser.id && (
                        <div className="flex items-center mb-1">
                          <Avatar className="mr-2">
                            <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-sm font-semibold">
                            {message.senderName}
                            <span className="ml-2 text-gray-500 text-xs">({message.senderTitle})</span>
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-xs p-3 rounded-lg text-white ${
                          message.senderId === currentUser.id
                            ? 'bg-green-600'
                            : getMessageStyle(message.senderTitle)
                        }`}
                      >
                        {message.senderId === currentUser.id && (
                          <div className="text-sm font-semibold text-right">
                            You
                            <span className="ml-2 text-gray-200 text-xs">({currentUser.title})</span>
                          </div>
                        )}
                        <div>{message.text}</div>
                        <div className="text-xs text-gray-300 mt-1 text-right">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </ScrollArea>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Input
                      className="flex-1"
                      placeholder="Type a message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      variant="green"
                      onClick={handleSendMessage}
                      className="p-2 rounded-full flex items-center justify-center"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}