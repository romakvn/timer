import { Dropdown }  from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";

const DropdownComponent = ({ args }) => {
    return (
        <DropdownButton id="dropdown-basic-button" variant="outline-danger" title={args.title} style={{paddingRight: '40px'}} size="sm" disabled={args.disabled}>
            {
                args.options.map(x => <Dropdown.Item key={x.key} onClick={() => args.hook(x)}>{x.key}</Dropdown.Item>)
            }
        </DropdownButton>
    )
}

export default DropdownComponent;