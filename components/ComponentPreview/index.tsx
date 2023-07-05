import { useReactive, useMount } from "ahooks";
import { load, type ComponentName } from "cds-design";
import manifest from "cds-design/dist/custom-elements.json";
import { SyntheticEvent, useMemo } from "react";

const SLOTTED_COMPONENTS = ["button", "badge", "alert"];

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
  required?: boolean;
};

type SanitizedAttributes = { [name: string]: SanitizedAttribute };

function inferTypes($type: string): {
  type: string | string[];
  inputType: string;
} {
  let type: string | string[] = $type.trim().replaceAll(/\"/g, "");

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
  let sanitizedAttributes: SanitizedAttributes = {};
  attributes.map((unsanitizedAttribute: Attribute) => {
    const { type, inputType } = inferTypes(unsanitizedAttribute.type.text);
    sanitizedAttributes[unsanitizedAttribute.name] = {
      type,
      inputType,
      required: !unsanitizedAttribute.default,
      default: unsanitizedAttribute.default?.replaceAll(/\"/g, ""),
    } as SanitizedAttribute;
  });
  return sanitizedAttributes;
}

type DOMAttributes = { [name: string]: string };

function useComponent(name: ComponentName) {
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

type CDSComponentProps = {
  name: ComponentName;
};

export default function ComponentPreview({ name }: CDSComponentProps) {
  const [attributes, DOMAttributes, setAttribute, setSlot] = useComponent(name);

  const CDSComponent = `cds-${name}` as const;

  const changeHandler = (event: any) => {
    for (const name in attributes) {
      const value = (event.target as HTMLElement).getAttribute(name)!;
      switch (value) {
        case "":
          setAttribute(name, "true");
          break;

        case null:
          setAttribute(name, "false");
          break;

        default:
          setAttribute(name, value);
          break;
      }
    }
  };

  return (
    <div>
      <CDSComponent {...DOMAttributes} onInput={changeHandler}>
        {SLOTTED_COMPONENTS.includes(name) && (
          <span contentEditable spellCheck="false">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            cum qui, modi voluptatem reprehenderit ab numquam doloremque in
            minus dicta minima voluptas excepturi culpa dolorum? Omnis fugit
            quasi nemo perferendis!
          </span>
        )}
      </CDSComponent>
      <Controller attributes={attributes} setAttribute={setAttribute} />
    </div>
  );
}

type ControllerProps = {
  attributes: SanitizedAttributes;
  setAttribute: (name: string, value: string) => void;
};

function Controller({ attributes, setAttribute }: ControllerProps) {
  const observe = (name: string, inputType: string = "text") => {
    return (event: SyntheticEvent) => {
      switch (inputType) {
        case "checkbox":
          setAttribute(
            name,
            (!(event.target as HTMLInputElement).checked).toString(),
          );
          break;

        default:
          setAttribute(name, (event.target as HTMLInputElement).value);
      }
    };
  };

  const inputs: JSX.Element[] = [];

  for (const name in attributes) {
    const attribute = attributes[name];

    inputs.push(<br key={`${name}-br`} />);

    switch (attribute.inputType) {
      case "select":
        inputs.push(
          <label key={name}>
            {name} :
            <select
              value={attribute.value ?? attribute.default}
              onChange={observe(name)}
            >
              {(attribute.type as string[]).map((type, i) => {
                return (
                  <option value={type} key={i}>
                    {type}
                  </option>
                );
              })}
            </select>
          </label>,
        );
        break;

      default:
        inputs.push(
          <label key={name}>
            {name} :
            <input
              type={attribute.inputType}
              key={name}
              value={attribute.value ?? attribute.default}
              checked={attribute.value === "true"}
              onInput={observe(name, attribute.inputType)}
            />
            {attribute.required &&
              (attribute.value === undefined || attribute.value === "") && (
                <span>required</span>
              )}
          </label>,
        );
    }
  }

  return <>{inputs}</>;
}
