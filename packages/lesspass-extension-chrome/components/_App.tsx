import React from "react";
import { AppOptions } from "./Screens/AppOptions";
import { LayoutApp } from "./LayoutApp";
import { Separator } from "./Separator";
import { AppProfilesManager } from "./Screens/AppProfilesManager";
import { useProfiles } from "./hooks/useProfiles";
import { defaultParams } from "../types";
import { useOptions } from "./hooks/useOptions";

// <AppOptions />
export const App = () => {
  return (
    <LayoutApp>
      <AppOptions />
      <Separator />
      <AppProfilesManager />
    </LayoutApp>
  );
};
