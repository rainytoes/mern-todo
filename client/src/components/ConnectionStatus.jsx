import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import socketService from '../services/socketService';

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = socketService.connect();

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      {isConnected ? (
        <>
          <Wifi size={16} />
          <span>Live</span>
        </>
      ) : (
        <>
          <WifiOff size={16} />
          <span>Offline</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;