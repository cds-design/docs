import load, { type ComponentName } from "cds-design";
import { useState, useEffect, useRef, SyntheticEvent } from "react";
import manifest from "cds-design/dist/custom-elements.json";

type Attribute = {
  name: string;
  type: {
    text: string;
  };
  default: string;
};

type SanitizedAttribute = {
  type: string[] | string;
  default: string;
  inputType: string;
  value?: string;
};

type SanitizedAttributes = { [name: string]: SanitizedAttribute };

function inferTypes($type: string): {
  type: string | string[];
  inputType: string;
} {
  let type: string | string[] = $type.trim().replaceAll(/\"/, "");

  if (type.includes("|")) {
    type = type.split(" | ");
  }

  let inputType = "";

  switch (type) {
    case "boolean":
      inputType = "checkbox";
      break;

    case "number":
      inputType = "number";
      break;

    case "string":
      inputType = "text";
      break;

    default:
      inputType = "select";
      break;
  }

  return {
    type,
    inputType,
  };
}

function sanitizeAttributes(attributes: Attribute[]): SanitizedAttributes {
  let sanitizedAttributes: SanitizedAttributes;
  attributes.map((unsanitizedAttribute: Attribute) => {
    const { type, inputType } = inferTypes(unsanitizedAttribute.type.text);
    sanitizeAttributes[unsanitizedAttribute.name] = {
      type,
      inputType,
      default: unsanitizedAttribute.default?.replaceAll(/\"/, ""),
    } as SanitizedAttribute;
  });
  return sanitizedAttributes;
}

function useComponent(
  name: ComponentName
): [SanitizedAttributes, (name: string, value: string) => void] {
  const { attributes: unSanitizedAttributes } = manifest.modules.find(
    (module) => module.path.endsWith(`${name}/index.ts`)
  )?.declarations[0] as { attributes: Attribute[] };

  const sanitizedAttributes = sanitizeAttributes(unSanitizedAttributes);

  const [attributes, $setAttributes] =
    useState<SanitizedAttributes>(sanitizeAttributes);

  function setAttribute(name: string, value: string) {
    attributes[name].value = value;
  }

  return [attributes, setAttribute];
}

type CDSComponentProps = {
  name: ComponentName;
};

export default function CDSComponent({
  props: { name },
}: {
  props: CDSComponentProps;
}) {
  const [code, setCode] = useState("");

  const tagName: `cds-${ComponentName}` = `cds-${name}`;

  const componentDOMRef = useRef<any>();

  useEffect(() => {
    setCode(componentDOMRef.current.outerHTML);
  }, [componentDOMRef]);

  load(name);

  const [attributes, setAttribute] = useComponent(name);

  let DOMAttributes: { [name: string]: string } = {};

  for (const name in attributes) {
    DOMAttributes[name] = attributes[name].value;
  }

  function changeHandler(event: Event) {
    for (const name in attributes) {
      const value = (event.target as HTMLElement).getAttribute(name)!;
      setAttribute(name, value);
    }
  }

  return (
    // @ts-ignore
    <tagName
      ref={componentDOMRef}
      {...DOMAttributes}
      onChange={changeHandler}
    />
  );
}

type ControllerProps = {
  attributes: SanitizedAttributes;
  setAttribute: (name: string, value: string) => void;
};

function Controller({ props }: { props: ControllerProps }) {
  function observe(name: string) {
    return (event: SyntheticEvent) => {
      props.setAttribute(name, (event.target as HTMLInputElement).value);
    };
  }

  const inputs = [];

  for (const name in props.attributes) {
    const attribute = props.attributes[name];

    switch (attribute.inputType) {
      case "select":
        return (
          <select>
            {(attribute.type as string[]).map((type) => {
              return <option value={type}>{type}</option>;
            })}
          </select>
        );

      default:
        return <input type={attribute.inputType} onInput={observe(name)} />;
    }
  }

  return <>{inputs}</>;
}
