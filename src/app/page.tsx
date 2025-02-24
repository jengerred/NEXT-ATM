// app/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { FaDollarSign, FaReceipt, FaArrowLeft, FaLock, FaPrint, FaClock } from 'react-icons/fa';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdraw';
}

export default function ATMScreen() {
  const [balance, setBalance] = useState(2500.0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [screen, setScreen] = useState<'main' | 'withdraw' | 'deposit' | 'transactions' | 'receipt'>('main');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial transactions
    setTransactions([
      { 
        id: 1, 
        date: new Date().toISOString().split('T')[0], 
        description: 'Initial deposit', 
        amount: 2500.0, 
        type: 'deposit' 
      },
    ]);
  }, []);

  const handleTransaction = async (type: 'deposit' | 'withdraw') => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) return;

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBalance = type === 'deposit' 
      ? balance + numericAmount 
      : balance - numericAmount;

    if (type === 'withdraw' && newBalance < 0) {
      alert('Insufficient funds');
      setLoading(false);
      return;
    }

    setBalance(newBalance);
    setTransactions([{
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      description: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
      amount: numericAmount,
      type
    }, ...transactions]);
    
    setAmount('');
    setLoading(false);
    setScreen('main');
  };

  const renderMainScreen = () => (
    <div className="space-y-6 w-full">
      {/* Balance Card */}
      <div className="bg-blue-900/30 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4 text-2xl">
          <FaLock className="text-blue-400" />
          <span>**** 1234</span>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <FaDollarSign className="text-4xl text-blue-400" />
          <div>
            <p className="text-gray-400">Available Balance</p>
            <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Transaction Options */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <button 
          onClick={() => setScreen('withdraw')}
          className="bg-blue-900/30 hover:bg-blue-900/50 p-6 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <FaDollarSign className="text-3xl" />
          <span>Withdraw Cash</span>
        </button>
        <button
          onClick={() => setScreen('deposit')}
          className="bg-blue-900/30 hover:bg-blue-900/50 p-6 rounded-xl flex flex-col items-center gap-2 transition-colors"
        >
          <FaReceipt className="text-3xl" />
          <span>Deposit Funds</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="flex justify-between gap-4 w-full">
        <button 
          onClick={() => setScreen('transactions')}
          className="text-blue-400 hover:text-blue-300 flex items-center gap-2 px-4 py-2"
        >
          <FaClock />
          Recent Transactions
        </button>
        <button 
          onClick={() => setScreen('receipt')}
          className="text-blue-400 hover:text-blue-300 flex items-center gap-2 px-4 py-2"
        >
          <FaPrint />
          Print Receipt
        </button>
      </div>
    </div>
  );

  const renderTransactionScreen = () => (
    <div className="space-y-6 w-full">
      <button 
        onClick={() => setScreen('main')}
        className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
      >
        <FaArrowLeft />
        Back to Main
      </button>

      <div className="bg-blue-900/30 p-6 rounded-2xl w-full">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full bg-transparent text-2xl py-4 px-6 border-b-2 border-blue-400 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 w-full">
        {['20', '50', '100', '200', '500', 'Other'].map((value) => (
          <button
            key={value}
            onClick={() => value === 'Other' ? null : setAmount(value)}
            className="bg-blue-900/30 hover:bg-blue-900/50 p-4 rounded-xl text-center transition-colors"
          >
            ${value}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleTransaction(screen === 'withdraw' ? 'withdraw' : 'deposit')}
        className="w-full bg-blue-500 hover:bg-blue-600 py-4 rounded-xl font-bold transition-colors"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Confirm Transaction'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-6 w-screen">
      <header className="mb-8 flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">NextBank ATM</h1>
        <div className="text-gray-400">{new Date().toLocaleTimeString()}</div>
      </header>

      <main className="space-y-8 w-full">
        {screen === 'main' ? renderMainScreen() : renderTransactionScreen()}
      </main>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}
