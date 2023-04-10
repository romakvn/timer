import Frame from './Frame';
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import roomService from '../services/roomService';

const Display = () => {
    const [rooms, setRooms] = useState(null)
    // const [prices, setPrices] = useState({})

    useEffect(async() => {
        try {
            const res = await roomService.getRooms()
            setRooms(res.rooms)
            console.log(res.rooms)
        } catch (error) {
            console.log(error)
        }
    }, [])

    let prices = require('../variables/prices.json').prices;

    return (
        <Row xs={1} md={2} lg={3} className="g-4">{
            rooms ?
            rooms.map(x => 
                <Col key={x.id}>
                    <Frame args={{
                        "room_id": x.id,
                        "room_type": x.isVIP ? "VIP" : "DEFAULT",
                        "price": {
                            "players_2": x.isVIP ? prices.VIP['2_players'] : prices.DEFAULT['2_players'],
                            "players_4": x.isVIP ? prices.VIP['4_players'] : prices.DEFAULT['4_players']
                        }
                    }}/>
                </Col>): <></>
        }</Row>
    )
}

export default Display;