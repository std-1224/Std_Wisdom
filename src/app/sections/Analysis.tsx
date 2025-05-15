'use client'
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaSignInAlt } from 'react-icons/fa';

const Analysis = () => {
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [loginsCount, setLoginsCount] = useState(0);

  // Spring configurations
  const [visitorsAnimationProps, setVisitorsAnimation] = useSpring(() => ({   from: { number: 0 },
    to: { number: visitorsCount },
    config: { duration: 5000 },
    reset: true,
    onRest: () => setVisitorsAnimation({ number: visitorsCount }) // Ensure it resets to the final value
  }));
  const [loginsAnimationProps, setLoginsAnimation] = useSpring(() => ({   from: { number: 0 },
    to: { number: visitorsCount },
    config: { duration: 5000 },
    reset: true,
    onRest: () => setVisitorsAnimation({ number: visitorsCount }) // Ensure it resets to the final value
  }));

  // Intersection Observer
  const { ref: visitorsRef, inView: visitorsInView } = useInView({ triggerOnce: true });
  const { ref: loginsRef, inView: loginsInView } = useInView({ triggerOnce: true });

  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      const fetchedVisitorsCount = 429494; // Replace with actual fetched data
      const fetchedLoginsCount = 56723;   // Replace with actual fetched data
      setVisitorsCount(fetchedVisitorsCount);
      setLoginsCount(fetchedLoginsCount);
    }, 1000); // Simulate delay for fetching data
  }, []);

  useEffect(() => {
    if (visitorsInView) {
      setVisitorsAnimation({ number: visitorsCount });
    }
  }, [visitorsInView, visitorsCount]);

  useEffect(() => {
    if (loginsInView) {
      setLoginsAnimation({ number: loginsCount });
    }
  }, [loginsInView, loginsCount]);

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      <div
        ref={visitorsRef}
        className="bg-white rounded-lg p-6 shadow-lg flex-1 min-w-[250px] max-w-md mx-4 transform transition-transform hover:scale-105 hover:shadow-2xl border border-gray-200"
      >
        <div className="flex items-center mb-4">
          <FaUsers className="text-blue-500 text-3xl mr-3" />
          <h2 className="text-xl font-semibold text-gray-800">Today's Visitors</h2>
        </div>
        <animated.div className="text-5xl text-center font-extrabold text-blue-600">
          {visitorsAnimationProps.number.to(n => n.toFixed(0))}
        </animated.div>
      </div>
      <div
        ref={loginsRef}
        className="bg-white rounded-lg p-6 shadow-lg flex-1 min-w-[250px] max-w-md mx-4 transform transition-transform hover:scale-105 hover:shadow-2xl border border-gray-200"
      >
        <div className="flex items-center mb-4">
          <FaSignInAlt className="text-green-500 text-3xl mr-3" />
          <h2 className="text-xl font-semibold text-gray-800">Today's Logins</h2>
        </div>
        <animated.div className="text-5xl text-center font-extrabold text-green-600">
          {loginsAnimationProps.number.to(n => n.toFixed(0))}
        </animated.div>
      </div>
    </div>
  );
};

export default Analysis;
