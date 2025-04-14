
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCheck } from 'lucide-react';

const ConnectWallet: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    // console.log("Hola")
    if (isConnected) {
      // Disconnect logic here
      setIsConnected(false);
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate connection process
    try {
      // Replace with actual wallet connection logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`inline-flex items-center justify-center gap-2 px-8 py-2.5 text-sm font-medium rounded-md transition-colors ${
        isConnected 
          ? 'bg-green-500 text-white hover:bg-green-600' 
          : 'bg-inda-blue text-white hover:bg-inda-blue/90'
      }`}
    >
      {isConnecting ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-white/40 border-t-white rounded-full" />
          Connecting...
        </>
      ) : isConnected ? (
        <>
          <CheckCheck className="w-5 h-5" />
          Wallet Connected
        </>
      ) : (
        <>
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};

export default ConnectWallet;
