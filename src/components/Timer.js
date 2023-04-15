import React, { useState, useEffect, useRef } from "react"
import { Button, ButtonGroup } from "react-bootstrap"

const Timer = ({args}) => {
    const [count, setCount] = useState(0) 
    
    const [start, setStart] = useState(false)
    const [stop, setStop] = useState(true)
    const [reset, setReset] = useState(true)
    const [add, setAdd] = useState(true)

    const [running, setRunning] = useState(false)

    const [end, setEnd] = useState(null)

    const [mins, setMins] = useState(null)
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (running) {
                setCount(count => count + 1)
                args.countRef.current = args.countRef.current + 1

                if (args.countRef.current > mins) {
                    args.alert(true)     
                } else {
                    args.alert(false)
                }

                args.total(Math.floor((args.countRef.current - 1) / (30 * 60)) * args.price)
            } else {
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [running, mins])

    const dateHelper = (date) => {
        let h = date.getHours()
        let m = date.getMinutes()
        if (h < 10) h = "0" + h
        if (m < 10) m = "0" + m
        
        return `${h} : ${m}`
    }

    const startTimer = () => {
        console.log(args.price)
        console.log("---------------------------")
        const startDate = new Date()
        const endDate = new Date()
        endDate.setSeconds(endDate.getSeconds() + args.time)

        args.start(dateHelper(startDate))
        args.end(dateHelper(endDate))

        setEnd(endDate)

        setRunning(true)
        setReset(true)
        setStart(true)
        setStop(false)
        setAdd(false)

        setMins(args.time)
        args.setDeff(false)
    }

    const stopTimer = () => {
        setRunning(false)
        setStart(false)
        setReset(false)
    }

    const resetTimer = () => {
        setRunning(false)
        setCount(0)
        args.countRef.current = 0
        args.alert(false)
        setReset(true)
        setStart(false)
        setStop(true)
        setAdd(true)
        args.setDeff(true)
    }

    const formatInput = () => {
        const result = {
            "hours": "0",
            "minutes": "0",
            "seconds": "0"
        }

        if (count < 60) {
            result.seconds = count
        } else if (count < 3600) {
            result.minutes = Math.floor(count / 60)
            result.seconds = count - result.minutes * 60
        } else {
            result.hours = Math.floor(count / 3600)
            result.minutes = Math.floor((count - (result.hours * 3600)) / 60)
            result.seconds = count - (result.hours * 3600 + result.minutes * 60)
        }

        if (result.hours < 10) {
            result.hours = "0" + result.hours
        }

        if (result.minutes < 10) {
            result.minutes = "0" + result.minutes
        }

        if (result.seconds < 10) {
            result.seconds = "0" + result.seconds
        }

        return `${result.hours} : ${result.minutes} : ${result.seconds}`
    }

    const addMins = () => {
        let endTime = new Date(end)
        endTime.setSeconds(endTime.getSeconds() + 30 * 60)
        setEnd(endTime)
        args.end(dateHelper(endTime))
        setMins(mins + 30 * 60)
    }

    return (
        <div>
            <h2>{args.deff ? "00 : 00 : 00" :formatInput()}</h2>
            <ButtonGroup>
                <Button disabled={start} variant="outline-success" onClick={startTimer} style={{marginRight: '5px'}}>start</Button>
                <Button disabled={stop} variant="outline-warning" onClick={stopTimer}>stop</Button>
                <Button disabled={reset} variant="outline-danger" onClick={resetTimer} style={{marginLeft: '5px'}}>reset</Button>
                <Button disabled={add} variant="outline-danger" onClick={addMins} style={{marginLeft: '5px'}}>+30min</Button>
            </ButtonGroup>
        </div>
    )
}

export default Timer