import type { ComponentName } from "cds-design";

export type Attribute = {
  name: string;
  type: {
    text: string;
  };
  default: string;
};

export type SanitizedAttribute = {
  type: string[] | string;
  default: string;
  inputType: string;
  value?: string;
  required?: boolean;
};

export type SanitizedAttributes = { [name: string]: SanitizedAttribute };

export type DOMAttributes = { [name: string]: string };

export type CDSComponentProps = {
  name: ComponentName;
};

export type ControllerProps = {
  attributes: SanitizedAttributes;
  setAttribute: (name: string, value: string) => void;
};
