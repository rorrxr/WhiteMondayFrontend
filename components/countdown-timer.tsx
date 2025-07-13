"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  targetDate: Date
  className?: string
  showCard?: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className = "", showCard = false }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const TimeDisplay = () => (
    <div className={`flex items-center space-x-2 ${className}`}>
      {timeLeft.days > 0 && (
        <>
          <div className="text-center">
            <div className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-lg">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-xs mt-1">일</div>
          </div>
          <span className="text-2xl font-bold text-red-500">:</span>
        </>
      )}
      <div className="text-center">
        <div className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-lg">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-xs mt-1">시</div>
      </div>
      <span className="text-2xl font-bold text-red-500">:</span>
      <div className="text-center">
        <div className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-lg">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-xs mt-1">분</div>
      </div>
      <span className="text-2xl font-bold text-red-500">:</span>
      <div className="text-center">
        <div className="bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-lg animate-pulse">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-xs mt-1">초</div>
      </div>
    </div>
  )

  if (showCard) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-red-600">특가 종료까지</h3>
            <TimeDisplay />
          </div>
        </CardContent>
      </Card>
    )
  }

  return <TimeDisplay />
}

export default CountdownTimer
