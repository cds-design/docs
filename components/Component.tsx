import load, { type ComponentName } from "cds-design";
import manifest from "cds-design/dist/custom-elements.json" 

const modules = manifest.modules[0].declarations[0];

type Attribute = { name: string; type: string, defaultValue?: string | number }

export default function Component(props: { name: ComponentName, children?: React.ReactNode }) {
    const { name, children } = props;
    load(name);
    const ComponentTagName = `cds-${name}` as keyof JSX.IntrinsicElements;

    const attributes: Attribute[] = modules.attributes.map(({ attribute, type: { text }, default: defaultValue }) => {
        return {
            name: attribute,
            type: text,
            defaultValue,
        }
    });
    return (
        <>
            <ComponentTagName>
            {children}
            </ComponentTagName>
            <div>
                {attributes.forEach(({ name }) => {
                    <span>{name}</span>
                })}
                
            </div>
        </>
    );
}