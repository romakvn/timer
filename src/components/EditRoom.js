import { useState } from "react";
import { Form, Button }  from "react-bootstrap";
import roomService from "../services/roomService"

const EditRoom = ({ args }) => {    
    const [checked, setChecked] = useState(args.type)

    const handleRequest = async (payload) => {
        try {
            const resp = await roomService.updateRooms(payload)

            console.log(resp)
        } catch ( error) {
            console.log(error)
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        const payload = {
            id: args.id,
            isVIP: checked
        }

        handleRequest(payload)
        args.edit(false)
    }

    const onChangeHandler = () => {
        setChecked(!checked)
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group>
                <Form.Check type="switch" label="vip room" onChange={onChangeHandler} defaultChecked={checked}/>
            </Form.Group>
            <Button type="submit" variant="primary">Save</Button>
        </Form>
    )
}

export default EditRoom;