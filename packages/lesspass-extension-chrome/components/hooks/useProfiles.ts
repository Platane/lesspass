import { useEffect, useState, useRef } from "react";
import browser from "../../browser";
import { Profile } from "../../types";
import { Options } from "./useOptions";

export const useProfiles = (options: Pick<Options, "profileStorage">) => {
  const storageType = options.profileStorage && options.profileStorage.type;
  const fromStorage = useRef<any>();

  const [profiles, setProfiles] = useState<Profile[]>([]);

  // browser storage read
  useEffect(() => {
    const s = getBrowserStorage(storageType);
    if (!s) return;

    // initial read
    s.get("profiles").then(({ profiles }) =>
      setProfiles((fromStorage.current = profiles || []))
    );

    // listen
    const onChange = changes => {
      if (changes.profiles)
        setProfiles((fromStorage.current = changes.profiles.newValue));
    };
    browser.storage.onChanged.addListener(onChange);
    return () => browser.storage.onChanged.removeListener(onChange);
  }, [storageType]);

  // write
  useEffect(() => {
    const s = getBrowserStorage(storageType);
    if (!s) return;

    if (!fromStorage.current) return;

    if (fromStorage.current === profiles) return;

    browser.storage.sync.set({ profiles });
  }, [profiles]);

  // api
  const addProfile = (p: Profile) =>
    setProfiles([
      ...profiles.filter(u => p.host !== u.host || p.login !== u.login),
      p
    ]);
  const removeProfile = p =>
    setProfiles(profiles.filter(u => p.host !== u.host || p.login !== u.login));

  return {
    profiles,
    pending: !fromStorage.current,
    addProfile,
    removeProfile
  };
};

const getBrowserStorage = storageType =>
  (storageType === "extension-sync" &&
    browser.storage &&
    browser.storage.sync) ||
  (storageType === "extension-local" &&
    browser.storage &&
    browser.storage.local) ||
  undefined;
