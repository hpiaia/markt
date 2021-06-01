import io from 'socket.io-client';

export const socketClient = () => io(process.env.NEXT_PUBLIC_API_URL || '');
