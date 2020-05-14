import React, { useState } from "react";
import { Segment, Search, Dropdown, Pagination } from "semantic-ui-react";

import MaireDeclarationTable from "../MaireDeclarationTable/MaireDeclarationTable.jsx";
import "./MaireDeclarations.css";


const MaireDeclarations = (props) => {

    const [activeFilter, setactiveFilter] = useState("New Declarations");

    const handle_filter = (e) => {
        setactiveFilter(e.currentTarget.firstChild.textContent);
    }

    return (
        <div className="_maire_declarations">
            <div className="_main_header">
                <div className="title_segment">
                    <p className="extra-text text-default">Declarations</p>
                </div>
            </div>
            <Segment className="_main_body shadow">
                <div className="row">
                    <Search
                    placeholder="Search for declarations ..." />
                    <Dropdown className="icon filter_declaration"
                        icon ="angle down"
                        text={activeFilter}
                        button
                        selection
                        labeled
                    >
                        <Dropdown.Menu>
                            <Dropdown.Item
                                text="New Declarations"
                                onClick={handle_filter}
                                label ={{circular : true, color : "blue", empty : true}}
                            />
                            <Dropdown.Item
                                text="Validated"
                                onClick={handle_filter}
                                label ={{circular : true, color : "green", empty : true}}
                                />
                            <Dropdown.Item
                                text="In progress"
                                onClick={handle_filter}
                                label={{circular : true, color : "yellow", empty : true}}
                            />
                            <Dropdown.Item
                                text="Treated"
                                onClick={handle_filter}
                                label={{circular : true, color : "green", empty : true}}
                            />
                            <Dropdown.Item
                                text="Refused"
                                onClick={handle_filter}
                                label={{circular : true, color : "red", empty : true}}
                            />
                            <Dropdown.Item
                                text="Archived"
                                onClick={handle_filter}
                                label={{circular : true, color : "black", empty : true}}
                            />
                            <Dropdown.Item
                                text="Lack of Infos"
                                onClick={handle_filter}
                                label={{circular : true, color : "orange", empty : true}}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <MaireDeclarationTable/>
                <Pagination className="_maire_pagination"
                boundaryRange={0}
                activePage={1}
                onPageChange={"onChange"}
                firstItem={null}
                lastItem={null}
                totalPages={3}
                pointing
                secondary/>
            </Segment>
        </div>)
}

export default MaireDeclarations;