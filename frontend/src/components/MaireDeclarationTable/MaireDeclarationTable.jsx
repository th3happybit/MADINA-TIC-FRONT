import React from "react";
import { Table } from "semantic-ui-react";


const MaireDeclarationTable = (props) => {

    return (
        <Table striped className="_maire_table">
            <Table.Header>
                <Table.HeaderCell
                content="Citizen Name"
                width={3}
                />
                <Table.HeaderCell
                content="Title"
                width={3}
                />
                <Table.HeaderCell
                content="Address"
                width={3}
                />
                <Table.HeaderCell
                content="Submitted On"
                width={2}
                />
                <Table.HeaderCell
                content="Manage"
                width={3}
                textAlign="center"
                />
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        Delaaa3a
                    </Table.Cell>
                    <Table.Cell>
                        Delaaa3a
                    </Table.Cell>
                    <Table.Cell>
                        Delaaa3a
                    </Table.Cell>
                    <Table.Cell>
                    Delaaa3a
                    </Table.Cell>
                    <Table.Cell>
                    Delaaa3a
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )

}

export default MaireDeclarationTable;