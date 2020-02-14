import { useEffect, useState } from "react";
import browser from "../../browser";
import { Profile, profileEquals } from "../../types";

type O = {
  storage:
    | null
    | { type: "extension-sync" }
    | { type: "extension-local" }
    | { type: "lesspass"; accessToken: string };
};

type State = {
  profiles: Profile[];
  status: "idle" | "loading" | "ready" | "error";
};

export const useProfiles = (options: O) => {
  const storageType = options.storage && options.storage.type;

  const [state, setState] = useState<State>({
    profiles: [],
    status: storageType ? "loading" : "idle"
  });

  // browser storage read
  useEffect(() => {
    if (storageType !== "extension-sync" && storageType !== "extension-local")
      return;

    const s = getBrowserStorage(storageType);

    if (!s) {
      setState(s => ({ ...s, status: "error" }));
      return;
    }

    setState(s => ({ ...s, status: "loading" }));

    s.get("profiles")
      .then(({ profiles }) => {
        setState(s => ({ profiles, status: "ready" }));
      })
      .catch(() => setState(s => ({ ...s, status: "error" })));

    const onChange = (changes, areaName) => {
      if (
        changes.profiles &&
        changes.profiles.newValue !== changes.profiles.oldValue
      )
        setState(s =>
          profilesEquals(s.profiles, changes.profiles.newValue)
            ? s
            : { ...s, profiles: changes.profiles.newValue }
        );
    };

    browser.storage.onChanged.addListener(onChange);

    return () => browser.storage.onChanged.removeListener(onChange);
  }, [storageType]);

  // browser storage write
  useEffect(() => {
    const s = getBrowserStorage(storageType);

    if (!s) return;

    if (state.status === "loading") return;

    s.set({ profiles: state.profiles });
  }, [storageType, state.profiles]);

  // helpers
  const addProfile = (p: Profile) =>
    setState(s => ({
      ...s,
      profiles: [
        ...s.profiles.filter(u => p.host !== u.host || p.login !== u.login),
        p
      ]
    }));
  const removeProfile = (host: string, login: string) =>
    setState(s => ({
      ...s,
      profiles: s.profiles.filter(p => p.host !== host || p.login !== login)
    }));

  return {
    ...state,
    pending: state.status === "loading",
    addProfile,
    removeProfile
  };
};

const profilesEquals = (a, b) =>
  a.length === b.length && a.every((_, i) => profileEquals(a[i], b[i]));

const getBrowserStorage = storageType =>
  (storageType === "extension-sync" &&
    browser.storage &&
    browser.storage.sync) ||
  (storageType === "extension-local" &&
    browser.storage &&
    browser.storage.local) ||
  undefined;
