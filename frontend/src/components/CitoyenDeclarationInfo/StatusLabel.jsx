import React from "react";

import {Label} from "semantic-ui-react";


const StatusLabel = (props) => {

return (
    <Label 
        className="status_label"
        content = {props.content}
        color = {props.color}
    />
)

}

export default StatusLabel;