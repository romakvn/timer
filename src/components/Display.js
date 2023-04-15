import Frame from './Frame';
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import roomService from '../services/roomService';
import priceService from '../services/priceService';
import { findPrice } from '../utils/prices';

const Display = () => {
    const [rooms, setRooms] = useState(null)
    const [prices, setPrices] = useState(null)

    useEffect(async() => {
        try {
            const res = await roomService.getRooms()
            setRooms(res)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(async() => {
        try {
            const res = await priceService.getPrices()
            setPrices(res)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <Row xs={1} md={2} lg={3} className="g-4">{
            rooms && prices ?
            rooms.map(x => 
                <Col key={x.id}>
                    <Frame args={{
                        "room_id": x.id,
                        "room_type": x.isVip == 1 ? "VIP" : "DEFAULT",
                        "price": {
                            "players_2": x.isVip == 1 ? findPrice(prices, 2, "VIP") : findPrice(prices, 2, "DEFAULT"),
                            "players_4": x.isVip == 1 ? findPrice(prices, 4, "VIP") : findPrice(prices, 4, "DEFAULT")
                        }
                    }}/>
                </Col>): <></>
        }</Row>
    )
}

export default Display;