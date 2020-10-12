import React from "react";
import TestComponent from "../../components/TestComponent/TestComponent.jsx";

const Consultations = () => {
  return (
    <TestComponent
      title="Rapports"
      url="https://madina-tic.ml/api/reports/"
      token="service_token"
      role="service"
      isRapport
      onModify={null}
      onUpdate={null} //? hna hot les components mch les fonctions c dire hot les modal taek wla jsp te3 update w modify
      header={[
        { text: "Titre", value: "title", sort: true },
        { text: "Description", value: "desc", sort: false },
        { text: "Créé en", value: "created_on", sort: true },
      ]}
      detail={[
        { text: "Titre Rapport", value: "title" },
        { text: "Créé en", value: "created_on" },
        { text: "Modifier en", value: "modified_at" },
        { text: "Validé en", value: "validated_at" },
        { text: "Description", value: "desc" },
      ]}
      permission="self" //? all or self
      status={["not_validated", "lack_of_info", "validated", "archived"]}
    />
  );
};

export default Consultations;
