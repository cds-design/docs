import { GLOBAL_CSS } from "cds-design/dist/constants";
import { parse, walk } from 'css-tree';
import { writeFile } from "node:fs/promises";
import MD, { MDTable, utils } from "./lib/MD.js";

const { noCSSWrap, wrapBackticks, customStyle, link } = utils;

function generateMarkdown() {
    const md = new MD();

    md.addH1("Variables");

    const CSS = new MDTable("Property", "Value")

    const css_ast = parse(GLOBAL_CSS.toString());

    walk(css_ast, ({ type, property: $property, value: $value }) => {
        if (type === "Declaration") {
            if ($property.startsWith("--")) {

                let property = $property;
                let value = $value.value;

                if (value.startsWith(`url("data:image`)) {
                    value = "texture-image";
                }

                if (/.*var\(--[\w][\w\d-]*.*\)/.test(value)) {
                    value = value.replaceAll(/var\(--([\w][\w\d-]*)\)/g, (_, property) => {
                        return link(noCSSWrap(wrapBackticks(`var(--${property})`), { color: '#9cdcfe' }), `#id--${property}`);
                    })
                }

                CSS.addRow(
                    noCSSWrap(wrapBackticks(property), { color: '#9cdcfe', scrollMarginTop: 65 }, `id${property}`),
                    customStyle(value, { color: '#f29766' })
                )
            }
        };
    });

    md.addTable(CSS);

    return md;
}

async function writeCSSVars(md: MD) {
    await writeFile(`./pages/reference/variables.mdx`, md.get());
}

async function generateCSSVars() {

    const md = generateMarkdown();

    await writeCSSVars(md);

    console.log("Auto generated variable refs  ✅")

}

export default generateCSSVars;