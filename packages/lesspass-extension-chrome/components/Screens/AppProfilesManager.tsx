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
          <Icon src={`https://${p.host}/favicon.ico`} />

          <div style={{ minWidth: "200px" }}>{p.host}</div>
          <div style={{ minWidth: "200px" }}>{p.login}</div>
          <pre
            style={{
              fontSize: "12px",
              background: "#fff",
              padding: "10px",
              margin: 0
            }}
          >
            {JSON.stringify(p.params, null, 1).slice(2, -2)}
          </pre>
        </Row>
      ))}
    </>
  );
};

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin: 4px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;
