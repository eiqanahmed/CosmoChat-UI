import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

export default function Activity() {
    const [chatData, setChatData] = useState([]);
    const hasIncremented = useRef(false);
    
    const updateChatData = () => {
        // Generate dates for the last 5 days
        const dates = [];
        for (let i = 4; i >= 0; i--) {
          dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
        }
    
        // Fetch chat session data from localStorage
        const data = dates.map((date) => {
          const sessions = localStorage.getItem(date) || 0;
          return { day: date, sessions: parseInt(sessions, 10) };
        });
    
        setChatData(data);
      };
    
      useEffect(() => {
        if (!hasIncremented.current) {
          // Increment session count for the current date
          const today = format(new Date(), 'yyyy-MM-dd');
          const currentSessions = localStorage.getItem(today) || 0;
          localStorage.setItem(today, parseInt(currentSessions, 10) + 1);
          hasIncremented.current = true;
        }
    
        // Update chat data
        updateChatData();
      }, []);

  return (
    <div>
        <div style={{ height: 300, width: '100%' }}>
        <ResponsiveContainer>
          <BarChart data={chatData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
    </div>
  )
}
