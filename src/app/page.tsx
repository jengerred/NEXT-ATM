// app/page.tsx
'use client';
import { useState } from 'react';
import { FaDollarSign, FaSearch, FaClock } from 'react-icons/fa';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdraw';
}

export default function Home() {
  const [balance, setBalance] = useState(2500.0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2025-02-23', description: 'Initial deposit', amount: 2500.0, type: 'deposit' },
  ]);
  const [searchDate, setSearchDate] = useState('');

  const handleTransaction = (type: 'deposit' | 'withdraw') => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount || numericAmount <= 0) return;

    const newBalance = type === 'deposit' 
      ? balance + numericAmount 
      : balance - numericAmount;

    if (type === 'withdraw' && newBalance < 0) {
      alert('Insufficient funds');
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
  };

  const filteredTransactions = searchDate
    ? transactions.filter(t => t.date === searchDate)
    : transactions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <header className="p-6 border-b border-blue-800">
        <h1 className="text-3xl font-bold">NextBank ATM</h1>
      </header>

      <main className="container mx-auto p-6">
        {/* Balance Card */}
        <div className="bg-blue-800/30 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-4">
            <FaDollarSign className="text-3xl text-blue-400" />
            <div>
              <p className="text-gray-400">Current Balance</p>
              <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Transaction Form */}
        <div className="max-w-screen-md mx-auto"> 
         
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
         className="w-full bg-gray-600/50 rounded-lg py-2 px-4  focus:ring-2 focus:ring-blue-500 outline-none"
          />

         <div className="flex gap-14 mt-4 ">
  <button
    onClick={() => handleTransaction('deposit')}
    className="flex-1 text-green-100 font-bold text-shadow-black bg-green-600 border-6 border-green-500 
            rounded-lg py-4 mt-2.5 mr-7.5 mb-12 shadow-atm
             hover:scale-125 transition-transform duration-300 active:bg-green-800 "
  >
    Deposit
  </button>
  <button
    onClick={() => handleTransaction('withdraw')}
    className="flex-1 text-red-100 font-bold text-shadow-black bg-red-600 border-6 border-red-500
             rounded-lg py-4 mt-2.5 mr-7.5 mb-12 shadow-atm
             hover:scale-125 transition-transform duration-300 active:bg-red-800"
  >
    Withdraw
  </button>
</div>

        </div>

     

        {/* Transaction History */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl">
          


          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaClock /> Transaction History
          </h2>
          
   {/* Transaction Search */}
   <div className="mb-6 flex items-center gap-4 bg-gray-700/50 p-4 rounded-lg">
          <FaSearch className="text-gray-400" />
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="bg-transparent outline-none flex-1"
            placeholder="Search by date..."
          />
        </div>

          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{transaction.description}</p>
                    <p className="text-sm text-gray-400">{transaction.date}</p>
                  </div>
                  <span className={`text-lg ${transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
