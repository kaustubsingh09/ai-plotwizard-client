import React from "react";
import CharacterTable from "./CharacterTable";

export default function RenderAllCharacters({ projectId }) {
  return (
    <div className="mt-10">
      <CharacterTable projectId={projectId} />
    </div>
  );
}
