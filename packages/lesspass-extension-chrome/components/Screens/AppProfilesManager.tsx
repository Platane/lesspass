import React from "react";
import styled from "@emotion/styled";
import { useOptions } from "../hooks/useOptions";
import { useProfiles } from "../hooks/useProfiles";

export const AppProfilesManager = () => {
  const { options } = useOptions();
  const { profiles, removeProfile } = useProfiles(options);

  return (
    <>
      <h1>Profiles</h1>

      {profiles.map(p => (
        <Row key={p.host + "+" + p.login} onClick={() => removeProfile(p)}>
          <div style={{ minWidth: "100px" }}>{p.host}</div>
          <div style={{ minWidth: "100px" }}>{p.login}</div>
          <pre
            style={{ fontSize: "12px", background: "#fff", padding: "10px" }}
          >
            {JSON.stringify(p.params, null, 2)}
          </pre>
        </Row>
      ))}
    </>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
