import React from "react";
import TestComponent from "../../components/TestComponent/TestComponent.jsx";

const ConsultationAnnonce = () => {
  return (
    <TestComponent
      title="Annonces"
      url="http://157.230.19.233/api/announces/"
      token="service_token"
      role="service"
      isRapport={false}
      header={[
        { text: "Title", value: "title", sort: true },
        { text: "Description", value: "desc", sort: false },
        { text: "Start At", value: "start_at", sort: true },
        { text: "End At", value: "end_at", sort: true },
      ]}
      detail={[
        { text: "Title Rapport", value: "title" },
        { text: "Description", value: "desc" },
        { text: "Created on", value: "created_on" },
        { text: "Start At", value: "start_at" },
        { text: "End At", value: "end_at" },
      ]}
      permission="self" //? all or self
      status={["not_validated", "published", "modified", "removed", "archived"]}
    />
  );
};

export default ConsultationAnnonce;
