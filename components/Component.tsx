import load, { type ComponentName } from "ct-ds";

export default function Component(props: { name: ComponentName, children?: React.ReactNode, attributes?: any }) {
    const { name, children, ...attributes } = props;
    load(name);
    const ComponentTagName = `ct-${name}` as keyof JSX.IntrinsicElements;
    return (
        <ComponentTagName {...attributes}>
            {children}
        </ComponentTagName>
    );
}