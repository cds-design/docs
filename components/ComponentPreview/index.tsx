import type { SyntheticEvent } from "react";
import { SLOTTED_COMPONENTS } from "./helpers";
import { useComponent } from "./hooks";
import type { CDSComponentProps, ControllerProps } from "./types";

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