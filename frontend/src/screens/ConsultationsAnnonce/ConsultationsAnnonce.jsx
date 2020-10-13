import React from "react";
import TestComponent from "../../components/TestComponent/TestComponent.jsx";

const ConsultationAnnonce = () => {
  return (
    <TestComponent
      title="Annonces"
      url="https://madina-tic.ml/api/announces/"
      token="service_token"
      role="service"
      isRapport={false}
      header={[
        { text: "Titre", value: "title", sort: true },
        { text: "Description", value: "desc", sort: false },
        { text: "Créé en", value: "start_at", sort: true },
        { text: "Fin At", value: "end_at", sort: true },
      ]}
      detail={[
        { text: "Titre Rapport", value: "title" },
        { text: "Créé en", value: "created_on" },
        { text: "Debut en", value: "start_at" },
        { text: "Fin en", value: "end_at" },
        { text: "Description", value: "desc" },
      ]}
      permission="self" //? all or self
      status={[
        "not_validated",
        "lack_of_info",
        "published",
        "modified",
        "removed",
        "archived",
      ]}
    />
  );
};

export default ConsultationAnnonce;
