import useMount from "ahooks/lib/useMount";
import useReactive from "ahooks/lib/useReactive";
import { load, type ComponentName } from "cds-design";
import manifest from "cds-design/dist/custom-elements.json";
import { sanitizeAttributes } from "./helpers";
import { Attribute, DOMAttributes } from "./types";

export function useComponent(name: ComponentName) {
    const { attributes: unSanitizedAttributes } = manifest.modules.find(
        (module) => module.path.endsWith(`${name}/index.ts`),
    )?.declarations[0] as { attributes: Attribute[] };

    useMount(() => {
        load(name);
    });

    const sanitizedAttributes = sanitizeAttributes(unSanitizedAttributes);

    const reactiveAttributes = useReactive(sanitizedAttributes);

    const reactiveDOMAttributes = useReactive<DOMAttributes>({});

    const reactiveSlot = useReactive<{ content: string }>({
        content: null,
    });

    const setAttribute = (name: string, value: string) => {
        reactiveAttributes[name].value = value;
        reactiveDOMAttributes[name] = value;
    };

    const setSlot = (content: string) => {
        reactiveSlot.content = content;
    };

    return [
        reactiveAttributes,
        reactiveDOMAttributes,
        setAttribute,
        setSlot,
    ] as const;
}
