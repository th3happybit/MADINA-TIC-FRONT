import React from "react";
import TestComponent from "../../components/TestComponent/TestComponent.jsx";

const Consultations = () => {
  return (
    <TestComponent
      title="Reports"
      url="http://157.230.19.233/api/reports/"
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
        { text: "Description", value: "desc" },
        { text: "Created on", value: "created_on" },
        { text: "Modified on", value: "modified_at" },
        { text: "Validated on", value: "validated_at" },
      ]}
      permission="self" //? all or self
      status={[
        "not_validated",
        "lack_of_info",
        "work_not_finished",
        "validated",
        "refused",
        "archived",
      ]}
    />
  );
};

export default Consultations;
