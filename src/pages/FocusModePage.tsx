import { useState, useEffect } from 'react';
import { Focus, Clock, Battery, MoveLeft } from 'lucide-react';

export default function FocusModePage() {
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-[80vh] flex flex-col items-center justify-center transition-all duration-500 ${isActive ? 'scale-105' : ''}`}>
      
      {!isActive ? (
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="mx-auto w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
            <Focus size={48} className="text-primary-600 dark:text-primary-400" />
          </div>
          
          <div className="space-y-4 max-w-lg mx-auto">
             <h1 className="text-4xl font-bold text-dark-900 dark:text-dark-50">Focus Mode</h1>
             <p className="text-dark-500 dark:text-dark-400 text-lg">
               Eliminate distractions and boost your productivity. We'll hide the sidebar and notifications so you can concentrate properly.
             </p>
          </div>

          <button 
            onClick={() => setIsActive(true)}
            className="px-8 py-4 bg-dark-900 dark:bg-primary-600 text-white rounded-2xl text-lg font-medium hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
          >
            Enter Focus Mode
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
           <div className="flex justify-between items-center mb-12">
             <button onClick={() => setIsActive(false)} className="flex items-center gap-2 text-dark-500 hover:text-dark-900 dark:text-dark-400 dark:hover:text-dark-100 transition-colors">
                <MoveLeft size={20} />
                Exit Focus Mode
             </button>
             <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-4 py-1.5 rounded-full text-sm font-medium">
                <Battery size={16} />
                High Energy
             </div>
           </div>

           <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full border-8 border-dark-100 dark:border-dark-100/30 ${isTimerRunning ? 'animate-pulse' : ''}`}></div>
              <div className="text-7xl font-bold text-dark-800 dark:text-dark-50 font-mono tracking-tighter">
                {formatTime(timer)}
              </div>
           </div>

           <div className="flex justify-center gap-6">
             <button 
               onClick={toggleTimer}
               className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 ${isTimerRunning ? 'bg-error' : 'bg-primary-600'}`}
             >
               {isTimerRunning ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
               ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
               )}
             </button>
             
             <button 
               onClick={resetTimer}
               className="w-16 h-16 rounded-full bg-dark-100 dark:bg-dark-100/50 text-dark-600 dark:text-dark-400 flex items-center justify-center hover:bg-dark-200 dark:hover:bg-dark-100 transition-colors"
             >
                <Clock size={24} />
             </button>
           </div>
           
           <p className="text-dark-400 italic">
             "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus."
           </p>
        </div>
      )}

    </div>
  );
}
