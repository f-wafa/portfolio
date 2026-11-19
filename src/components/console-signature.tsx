"use client";

import { useEffect } from "react";
import { profile } from "@/content/profile";

export function ConsoleSignature() {
  useEffect(() => {
    const heading =
      "color:#bc3d18;font:600 13px/1.5 ui-sans-serif,system-ui,sans-serif";
    const body =
      "color:#8a857a;font:12px/1.6 ui-monospace,SFMono-Regular,monospace";

    console.log(
      "%cYou opened the console.\n%cI'm Faiz. I build small web tools and keep the code public.\n%c%s · %s",
      heading,
      body,
      body,
      profile.github,
      profile.email,
    );
  }, []);

  return null;
}
