import React from "react";
import TestComponent from "../TestComponent/TestComponent.jsx";

const MaireRapports = () => {
  return (
    <TestComponent
      title="Rapports"
      url="https://www.madina-tic.ml/api/reports/"
      token="maire_token"
      role="maire"
      isRapport
      header={[
        { text: "Title", value: "title", sort: true },
        { text: "Description", value: "desc", sort: false },
        { text: "Created on", value: "created_on", sort: true },
      ]}
      detail={[
        { text: "Title Report", value: "title" },
        { text: "Description", value: "desc" },
        { text: "Created on", value: "created_on" },
        { text: "Modified on", value: "modified_at" },
        { text: "Validated on", value: "validated_at" },
      ]}
      permission="all" //? all or self
      status={[
        "not_validated",
        "lack_of_info",
        "validated",
        "archived",
      ]}
    />
  );
};

export default MaireRapports;
