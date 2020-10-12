import React from "react";
import TestComponent from "../TestComponent/TestComponent.jsx";

const MaireRapports = () => {
  return (
    <TestComponent
      title="Rapports"
      url="https://madina-tic.ml/api/reports/"
      token="maire_token"
      role="maire"
      isRapport
      header={[
        { text: "Titre", value: "title", sort: true },
        { text: "Description", value: "desc", sort: false },
        { text: "Créé en", value: "created_on", sort: true },
      ]}
      detail={[
        { text: "Titre Report", value: "title" },
        { text: "Description", value: "desc" },
        { text: "Créé en", value: "created_on" },
        { text: "Modifier en", value: "modified_at" },
        { text: "Validé en", value: "validated_at" },
      ]}
      permission="all" //? all or self
      status={["not_validated", "lack_of_info", "validated", "archived"]}
    />
  );
};

export default MaireRapports;
