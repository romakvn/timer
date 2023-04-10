import React, { useState, useEffect, useRef } from "react"
import { Button, ButtonGroup } from "react-bootstrap"

const Timer = ({args}) => {
    const [count, setCount] = useState(0) 
    const countRef = useRef(1)

    const [start, setStart] = useState(false)
    const [stop, setStop] = useState(true)
    const [reset, setReset] = useState(true)
    const [add, setAdd] = useState(true)

    const [running, setRunning] = useState(false)
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (running) {
                setCount(count => count + 1)
                countRef.current = countRef.current + 1

                if (countRef.current >= args.time) {
                    args.alert(true)     
                }

                args.total(Math.floor((countRef.current - 1) / 30) * args.price)
            } else {
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [running])

    const dateHelper = (date) => {
        let h = date.getHours()
        let m = date.getMinutes()
        if (h < 10) h = "0" + h
        if (m < 10) m = "0" + m
        
        return `${h} : ${m}`
    }

    const startTimer = () => {
        const startDate = new Date()
        const endDate = new Date()
        endDate.setSeconds(endDate.getSeconds() + args.time)

        args.start(dateHelper(startDate))
        args.end(dateHelper(endDate))

        setRunning(true)
        setReset(true)
        setStart(true)
        setStop(false)
        setAdd(false)
    }

    const stopTimer = () => {
        setRunning(false)
        setStart(false)
        setReset(false)
    }

    const resetTimer = () => {
        setRunning(false)
        setCount(0)
        countRef.current = 0
        args.alert(false)
        setReset(true)
        setStart(false)
        setStop(true)
        setAdd(true)
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

    return (
        <div>
            <h2>{formatInput()}</h2>
            <ButtonGroup>
                <Button disabled={start} variant="outline-success" onClick={startTimer} style={{marginRight: '5px'}}>start</Button>
                <Button disabled={stop} variant="outline-warning" onClick={stopTimer}>stop</Button>
                <Button disabled={reset} variant="outline-danger" onClick={resetTimer} style={{marginLeft: '5px'}}>reset</Button>
                <Button disabled={add} variant="outline-danger" onClick={resetTimer} style={{marginLeft: '5px'}}>+30min</Button>
            </ButtonGroup>
        </div>
    )
}

export default Timer