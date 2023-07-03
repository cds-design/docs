import manifest from "cds-design/dist/custom-elements.json" assert { type: "json" };
import { writeFile } from "node:fs/promises";
import MD, { MDTable, utils } from "./lib/MD.js";

const { noCSSWrap, wrapBackticks } = utils;

type Declaration = typeof manifest.modules[number]["declarations"][number];

type Member = Declaration["members"][number] & {
    privacy?: "private" | undefined
    return?: {
        type: {
            text: string
        }
    }
};

function generateMarkdown(component: Declaration) {

    const members = (component.members as Member[]).filter(({ kind, privacy }) => (["field", "method", "event"].includes(kind) && privacy !== "private"));

    const md = new MD();

    md.addH1(component.name);

    const attributes = new MDTable("Property", "Description", "Attribute", "Type", "Default")
        .addHeading("Attributes", 2);
    const methods = new MDTable("Method", "Description", "Returns")
        .addHeading("Methods", 2);
    const events = new MDTable("Event", "Description")
        .addHeading("Events", 2);

    members.map((member) => {
        switch (member.kind) {
            case "field":
                attributes.addRow(
                    member.name,
                    member.description,
                    (member.attribute),
                    (wrapBackticks(member.type.text, "ts")),
                    member.default === undefined ? "__required__" : wrapBackticks(member.default, "ts")
                )
                break;

            case "method":
                methods.addRow(
                    member.name,
                    member.description,
                    (wrapBackticks(member.return?.type.text ?? "void", "ts"))
                )
                break;

            case "event":
                events.addRow(
                    member.name,
                    member.description
                )
                break;
        }
    })

    md.addTable(attributes)
        .addTable(methods)
        .addTable(events);

    return md.get()

}

async function writeMarkdown(component: Declaration) {
    await writeFile(`./pages/components/${component.name}.mdx`, generateMarkdown(component));
}


async function generateComponentDocs() {

    const components = manifest.modules.map(({ declarations }) => {
        return declarations[0] // each module only has one declaration
    })

    await Promise.all(components.map(async (component) => await writeMarkdown(component)))

    console.log("Auto generated component docs  ✅")
}

export default generateComponentDocs