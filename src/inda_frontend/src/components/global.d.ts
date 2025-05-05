const ckUSDCIdlFactory = ({ IDL }) => {
    return IDL.Service({
        transfer: IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    });
  };
  interface Window {
  
  ic: {
    plug: {
      // batchTransactions: ({
      //   idl: ckUSDCIdlFactory,
      //   canisterId: string,
      //   methodName: string,
      //   args: {
      //     to: string,
      //     amount: number,
      //     memo: BigInt}
      //   }
      // ) => Promise<any>;
      requestConnect: (params?: RequestConnectParams) => Promise<string>;
      disconnect: () => Promise<boolean>;
      isConnected: () => Promise<boolean>;
      getPrincipal: () => Promise<Principal>;
      createActor: ({canisterId: String, interfaceFactory: interfaceFactory}) => Promise<>;
      requestTransfer: ({
        to: string,
        amount: number,
        memo: number
      }
      ) => Promise<{ height: number }>;
      requestBalance: () => Promise<number>;
      sessionManager: {
        sessionData: {
          agent: HttpAgent;
          principalId: string;
          accountId: string;
        } | null;
      };
      principalId: string;
      accountId: string;
      agent: HttpAgent;

    };
  };
}

interface RequestConnectParams {
  whitelist?: string[];
  host?: string;
  onConnectionUpdate?: () => void;
  timeout?: number;
}

