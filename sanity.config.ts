import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./sanity/schema";

export default defineConfig({
  name: "mytummi",
  title: "My Tummi Blog",
  projectId: "mvzp3r3f",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schema },
});
