import React from 'react';
import {HistoryCard} from "../HistoryCard";

export const DriverRideHistory = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center items-center p-8 pb-16 gap-4'>
      <HistoryCard/>
      <HistoryCard/>
      <HistoryCard/>
      <HistoryCard/>
      <HistoryCard/>
      <HistoryCard/>
      <HistoryCard/>
      <HistoryCard/>
    </div>
  )
}
