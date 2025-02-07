// import {useEffect, useState} from 'react';

// interface CountdownTimerProps {
//   targetDate: string;
// }

// interface TimeLeft {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

// const CountdownTimer: React.FC<CountdownTimerProps> = ({targetDate}) => {
//   const [timeLeft, setTimeLeft] = useState<TimeLeft>({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const target = new Date(targetDate);
//       const diff = target.getTime() - now.getTime();

//       if (diff <= 0) {
//         clearInterval(interval); // Stop the countdown when it reaches the target
//         return;
//       }

//       const days = Math.floor(1);
//       const hours = Math.floor(
//         (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
//       );
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//       setTimeLeft({days, hours, minutes, seconds});
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup the interval on component unmount
//   }, [targetDate]);

//   return (
//     <div>
//       <div className="flex font-bold text-5xl">
//         <div className="">
//           <h1 className=""> 0{timeLeft.days} </h1>
//           <h1 className="text-2xl text-center">Day</h1>
//         </div>
//         <span> : </span>
//         <div className="">
//           <h1 className=""> {timeLeft.hours}</h1>
//           <h1 className="text-2xl text-center">Hours</h1>
//         </div>
//         <span> : </span>
//         <div className=" ">
//           <h1 className=""> {timeLeft.minutes} </h1>
//           <h1 className="text-2xl text-center">Min</h1>
//         </div>
//         <span> : </span>
//         <div className=" ">
//           <h1 className=""> {timeLeft.seconds}</h1>
//           <h1 className="text-2xl text-center">Sec</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CountdownTimer;

import {useEffect, useState} from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({targetDate}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval); // Stop the countdown when it reaches the target
        return;
      }

      const days = Math.floor(7);
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [targetDate]);

  return (
    <div>
      <div className="flex font-bold text-5xl font-digit  gap-x-2">
        <div className="text-center">
          <h1 className="">{String(timeLeft.days).padStart(2, '0')}</h1>
          <h1 className="text-2xl text-center">Day</h1>
        </div>
        <div className=""> : </div>
        <div className="text-center">
          <h1 className="">{String(timeLeft.hours).padStart(2, '0')}</h1>
          <h1 className="text-2xl text-center">Hours</h1>
        </div>
        <span> : </span>
        <div className="text-center">
          <h1 className="">{String(timeLeft.minutes).padStart(2, '0')}</h1>
          <h1 className="text-2xl text-center">Min</h1>
        </div>
        <span> : </span>
        <div className="text-center">
          <h1 className="">{String(timeLeft.seconds).padStart(2, '0')}</h1>
          <h1 className="text-2xl text-center">Sec</h1>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
