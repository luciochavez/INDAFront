module {
  public type Account = { owner : Principal; subaccount : ?Subaccount };
  public type AccountIdentifier = Blob;
  public type ApplyInterestResult = {
    #ok : ApplyInterestSummary;
    #err : NeuronsError;
  };
  public type ApplyInterestSummary = {
    applied : Tokens;
    affiliatePayouts : Nat;
    totalHolders : Nat;
    supply : { after : Tokens; before : Tokens };
    timestamp : Time;
    remainder : Tokens;
  };
  public type AvailableLiquidityGraph = [(Int, Nat64)];
//   public type Blob = Blob;
  public type BlockIndex = Nat64;
  public type DailyResult = (
    ?ApplyInterestResult,
    ?FlushPendingDepositsResult,
    ?SplitNewWithdrawalNeuronsResult,
  );
  public type DepositErr = { #TransferFailure; #BalanceLow };
  public type DepositReceipt = { #Ok : Nat; #Err : DepositErr };
  public type DissolveState = {
    #DissolveDelaySeconds : Nat64;
    #WhenDissolvedTimestampSeconds : Nat64;
  };
  public type FlushPendingDepositsResult = {
    #ok : [TransferResult];
    #err : NeuronsError;
  };
  public type GovernanceError = { error_message : Text; error_type : Int32 };
  public type ICRC1TransferError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
  public type JobResult = {
    completedAt : ?Time;
    result : ?Result;
    startedAt : Time;
  };
  public type Lead = {
    firstTouchAt : Time;
    principal : Principal;
    convertedAt : ?Time;
    lastTouchAt : Time;
    affiliate : ?Principal;
  };
  public type Metric = {
    t : Text;
    value : Text;
    help : ?Text;
    name : Text;
    labels : [(Text, Text)];
  };
  public type Neuron = {
    id : Nat64;
    accountId : AccountIdentifier;
    stakedMaturityE8sEquivalent : ?Nat64;
    dissolveState : ?DissolveState;
    cachedNeuronStakeE8s : Nat64;
  };
  public type NeuronId = { id : Nat64 };
  public type NeuronResult = { #ok : Neuron; #err : NeuronsError };
  public type NeuronsError = {
    #InsufficientMaturity;
    #InsufficientStake;
    #Other : Text;
    #GovernanceError : GovernanceError;
    #ProposalNeuronMissing;
  };
  public type NeuronsResult = { #ok : [Neuron]; #err : NeuronsError };
  public type Payout = { createdAt : Time; amount : Nat };
  public type PayoutResult = { #ok : BlockIndex; #err : WithdrawalsError };
  public type ReferralStats = { code : Text; count : Nat; earned : Nat };
  public type Result = { #ok : Any; #err : Text };
  public type Result_1 = { #ok : Withdrawal; #err : WithdrawalsError };
  public type SplitNewWithdrawalNeuronsResult = {
    #ok : [(Nat64, Nat64, Bool)];
    #err : NeuronsError;
  };
  public type Subaccount = Blob;
  public type Time = Int;
  public type TokenError = {
    #InsufficientAllowance;
    #InsufficientBalance;
    #ErrorOperationStyle;
    #Unauthorized;
    #LedgerTrap;
    #ErrorTo;
    #Other : Text;
    #BlockUsed;
    #AmountTooSmall;
  };
  public type Tokens = { e8s : Nat64 };
  public type TransferError = {
    #TxTooOld : { allowed_window_nanos : Nat64 };
    #BadFee : { expected_fee : Tokens };
    #TxDuplicate : { duplicate_of : BlockIndex };
    #TxCreatedInFuture;
    #InsufficientFunds : { balance : Tokens };
  };
  public type TransferResult = { #Ok : BlockIndex; #Err : TransferError };
  public type TxReceipt = { #Ok : Nat; #Err : TxReceiptError };
  public type TxReceiptError = {
    #InsufficientAllowance;
    #InsufficientBalance;
    #ErrorOperationStyle;
    #Unauthorized;
    #LedgerTrap;
    #ErrorTo;
    #Other : Text;
    #BlockUsed;
    #AmountTooSmall;
  };
  public type UpgradeData = {
    #v1 : {
      codes : [(Principal, Text)];
      leads : [Lead];
      totals : [(Principal, Nat)];
      conversions : [(Principal, [Principal])];
      payouts : [(Principal, [Payout])];
    };
  };
  public type Withdrawal = {
    id : Text;
    readyAt : ?Time;
    total : Nat64;
    pending : Nat64;
    createdAt : Time;
    user : Principal;
    disbursed : Nat64;
    available : Nat64;
    expectedAt : Time;
    disbursedAt : ?Time;
  };
  public type WithdrawalsError = {
    #InvalidAddress;
    #TransferError : TransferError;
    #NeuronsError : NeuronsError;
    #InsufficientBalance;
    #ICRC1TransferError : ICRC1TransferError;
    #InsufficientLiquidity;
    #Other : Text;
    #TokenError : TokenError;
  };
  public type Self = actor {
    accountIdFromPrincipal : shared Principal -> async Text;
    addOwner : shared Principal -> ();
    addStakingNeuron : shared Nat64 -> async NeuronResult;
    aprMicrobips : shared query () -> async Nat64;
    availableBalance : shared () -> async Nat64;
    availableLiquidityGraph : shared () -> async AvailableLiquidityGraph;
    completeWithdrawal : shared (Principal, Nat64, Text) -> async PayoutResult;
    createWithdrawal : shared (Account, Nat64) -> async Result_1;
    depositIcp : shared () -> async DepositReceipt;
    depositIcpFor : shared Principal -> async DepositReceipt;
    exchangeRate : shared query () -> async (Nat64, Nat64);
    flushPendingDeposits : shared () -> async ?FlushPendingDepositsResult;
    getAppliedInterest : shared () -> async [ApplyInterestSummary];
    getAppliedInterestMerges : shared () -> async [
        [(Nat64, Nat64, NeuronResult)]
      ];
    getDepositAddress : shared query ?Text -> async Text;
    getDepositAddressFor : shared query Principal -> async Text;
    getDepositSubaccount : shared query ?Text -> async Blob;
    getDepositSubaccount2 : shared query Principal -> async Blob;
    getDepositSubaccount3 : shared query () -> async Blob;
    getDepositSubaccountFor : shared query Principal -> async Blob;
    getLastDailyJobResult : shared () -> async DailyResult;
    getLastJobResult : shared Text -> async ?JobResult;
    getReferralData : shared () -> async ?UpgradeData;
    getReferralStats : shared () -> async ReferralStats;
    getTotalMaturity : shared () -> async Nat64;
    get_all_owners : shared query () -> async [Principal];
    listDissolvingNeurons : shared () -> async [Neuron];
    listNeuronsToDisburse : shared () -> async [Neuron];
    listWithdrawals : shared Principal -> async [Withdrawal];
    metrics : shared () -> async [Metric];
    neuronAccountId : shared (Principal, Nat64) -> async Text;
    neuronAccountIdSub : shared (Principal, Blob) -> async Text;
    refreshNeuronsAndApplyInterest : shared () -> async [(Nat64, Nat64, Bool)];
    removeDisbursedNeurons : shared [Nat64] -> async [Neuron];
    removeOwner : shared Principal -> ();
    resetStakingNeurons : shared [Nat64] -> async NeuronsResult;
    setAppliedInterest : shared [ApplyInterestSummary] -> async ();
    setAprOverride : shared ?Nat64 -> async ();
    setInitialSnapshot : shared () -> async (Text, [(Account, Nat)]);
    setLastJobResult : shared (Text, JobResult) -> async ();
    setMetrics : shared ?Principal -> ();
    setReferralData : shared ?UpgradeData -> async ();
    setSchedulerPaused : shared Bool -> async ();
    setToken : shared Principal -> ();
    setTokenMintingAccount : shared () -> async ();
    setTotalMaturity : shared Nat64 -> async ();
    stakingNeuronBalances : shared () -> async [(Nat64, Nat64)];
    stakingNeurons : shared () -> async [{ id : NeuronId; accountId : Text }];
    whoami : shared () -> async Principal;
    withdrawProtocolFees : shared Principal -> async TxReceipt;
    withdrawalsTotal : shared () -> async Nat64;
  }
}