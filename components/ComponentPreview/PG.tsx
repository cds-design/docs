import { writeFile } from "node:fs/promises";
import Playground from "../Playground";
import load, { ComponentName } from "cds-design";
import manifest from "cds-design/dist/custom-elements.json";
import { renderToString } from "react-dom/server";

function genPlayground(component) {
  return <Playground name={component.name}></Playground>;
}

async function writeComponent(component) {
  const componentString = renderToString(genPlayground(component.name));
  await writeFile(`../../pages/components/${component.name}.mdx`, genPlayground(component.name));
}

async function generateComponentDocs() {
  const components = manifest.modules.map(({ declarations }) => {
    return declarations[0]; // each module only has one declaration
});

  await Promise.all(
    components.map(async (component) => await writeComponent(component))
  );
}

generateComponentDocs();
