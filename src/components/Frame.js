import { useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import DropdownComponent from "./DropdownComponent";
import Timer from "./Timer";
import EditRoom from "./EditRoom";

const Frame = ({args}) => {
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [players, setPlayers] = useState({"key": 2, "value": 2})
    const [time, setTime] = useState({"key":"1 hour", "value": 60*60})
    const [edit, setEdit] = useState(false)
    const [alert, setAlert] = useState(false)
    const [total, setTotal] = useState(0)

    const defaultStyle = {
        width: '20rem', borderColor: "green", borderRadius: '10px', borderWidth: '3px'
    }

    const alertStyle = {
        width: '20rem', borderColor: "red", borderRadius: '10px', borderWidth: '5px'
    }

    return (
        <Card style={alert ? alertStyle : defaultStyle}>
            <Card.Body>
                <Card.Title>Room Id: {args.room_id}</Card.Title>
                <div style={{display: "flex"}}>
                    <Card.Subtitle style={{marginTop: '10px'}} className="mb-2 text-muted">Room Type: {args.room_type}</Card.Subtitle>
                    <Button style={{marginLeft: '40px'}} size="sm" variant="outline-warning" onClick={() => {setEdit(!edit)}}>{!edit?`edit`:`back`}</Button>  
                </div>
                {
                    edit ? 
                    <EditRoom args={{"id": args.room_id, "type": args.room_type === "VIP", "edit": setEdit}} /> :
                    <div>
                        <ButtonGroup style={{marginTop: '20px'}}>
                            <DropdownComponent args = {{
                                "title": "Players: " + players.key,
                                "options": [{"key": 2,"value": 2}, {"key":4, "value": 4}],
                                "hook": setPlayers
                            }} />
            
                            <DropdownComponent args = {{
                                "title": "Time: " + time.key,
                                "options": [{"key": "20sec", "value": 20}, {"key":"30 min", "value": 30*60}, {"key":"1 hour", "value": 60*60}, {"key":"2 hours", "value": 2*60*60}],
                                "hook": setTime
                            }} />
                        </ButtonGroup>
                        
                        <div style={{display: "flex", marginTop:'10px'}}>
                            <Card.Text style={{marginRight: '10px', marginTop: '10px'}}>Start Time: {start ? start : "None"} </Card.Text>
                            <Card.Text style={{marginLeft: '10px', marginTop: '10px'}}>End Time: {end ? end : "None"} </Card.Text>
                        </div>
        
                        <Timer args={{
                            "start": setStart,
                            "end": setEnd,
                            "alert": setAlert,
                            "time": time.value,
                            "total": setTotal,
                            "price": 10
                        }} />

                        <ButtonGroup style={{marginTop:'15px'}}>
                            <Button size="sm" disabled={true} style={{width:'200px', borderRadius: '10px', position: "right", background: "red"}}>Total: {total} გელა</Button>
                            <Button variant="success" size="sm" style={{borderRadius: '20px', position: "right", "marginLeft": '30px'}}>Save</Button> 
                        </ButtonGroup>
                    </div>
                }
            </Card.Body>
        </Card>
    )
}

export default Frame;