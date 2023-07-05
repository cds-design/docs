import type { Attribute, SanitizedAttributes, SanitizedAttribute } from "./types"

export function inferTypes($type: string): {
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

export function sanitizeAttributes(attributes: Attribute[]): SanitizedAttributes {
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

export const SLOTTED_COMPONENTS = ["button", "badge", "alert"];