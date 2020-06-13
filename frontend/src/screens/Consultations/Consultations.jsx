import React from "react";
import TestComponent from "../../components/TestComponent/TestComponent.jsx";

const Consultations = () => {
  return (
    <TestComponent
      title="Reports"
      url="https://www.madina-tic.ml/api/reports/"
      token="service_token"
      role="service"
      isRapport
      onModify={null}
      onUpdate={null} //? hna hot les components mch les fonctions c dire hot les modal taek wla jsp te3 update w modify
      header={[
        { text: "Title", value: "title", sort: true },
        { text: "Description", value: "desc", sort: false },
        { text: "Created on", value: "created_on", sort: true },
      ]}
      detail={[
        { text: "Title Report", value: "title" },
        { text: "Created on", value: "created_on" },
        { text: "Modified on", value: "modified_at" },
        { text: "Validated on", value: "validated_at" },
        { text: "Description", value: "desc" },
      ]}
      permission="self" //? all or self
      status={[
        "not_validated",
        "lack_of_info",
        "validated",
        "archived",
      ]}
    />
  );
};

export default Consultations;
