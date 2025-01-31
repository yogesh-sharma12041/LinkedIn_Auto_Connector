import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "LinkedIn Auto Connector",
    description:
      "it is a chrome extesnion that helps user to connect and follow the people on linkedIn",
    version: "0.1.0",
  },
});
