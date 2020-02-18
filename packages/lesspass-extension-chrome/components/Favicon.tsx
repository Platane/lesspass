import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

type State = { type: "loading" } | { type: "done"; url: string | undefined };

export const Favicon = ({ host, ...props }) => {
  const [state, setState] = useState<State>({ type: "loading" });

  useEffect(() => {
    setState({ type: "loading" });
    getFaviconUrl(host).then(url => setState({ type: "done", url }));
  }, [host]);

  if (state.type === "loading") return <FaviconPlaceholder {...props} />;

  if (state.type === "done" && !state.url)
    return <FaviconFallback {...props} host={host} />;

  if (state.type === "done" && state.url)
    return (
      <Image {...props} style={{ backgroundImage: `url(${state.url})` }} />
    );
};

const FaviconFallback = ({ host, ...props }) => {
  const root = getRootHost(host);

  return (
    <Image {...props} style={{ backgroundColor: getColor(root) }}>
      {root[0]}
    </Image>
  );
};

const getFaviconUrl = async (host: string): Promise<string | undefined> => {
  const url = `https://${host}/favicon.ico`;

  const ok = await new Promise(resolve => {
    const image = document.createElement("img");

    if (image.naturalWidth) {
      resolve(true);
    } else {
      image.addEventListener("load", () => resolve(true));
      image.addEventListener("error", () => resolve(false));

      image.src = url;
    }
  });

  if (ok) return url;

  const parentHost = getParentHost(host);

  if (!parentHost) return undefined;

  return getFaviconUrl(parentHost);
};

export const Image = styled.div`
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 2px;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 13px;
  font-weight: bold;
  text-transform: capitalize;
`;

const FaviconPlaceholder = Image;

const getColor = (s: string) =>
  `hsl(${parseInt(s.replace(/[^\w]/g, ""), 36) % 360},70%,50%)`;

const getParentHost = (host: string) => {
  const fragments = host.split(".");

  if (fragments.length <= 2) return undefined;

  return fragments.slice(1).join(".");
};

const getRootHost = (host: string) =>
  host
    .split(".")
    .slice(-2)
    .join(".");
