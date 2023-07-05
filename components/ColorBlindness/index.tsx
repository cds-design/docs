import { useState } from "react";
// import { svg } from "./style.css"

const conditions = {
  normal: [
    "#4190ca",
    "#0100f6",
    "#38069d",
    "#7917a9",
    "#b92748",
    "#eb3223",
    "#e9602d",
    "#ee9d39",
    "#f2c042",
    "#feff53",
    "#c3d946",
    "#66ae35",
  ],
  rg: [
    "#bfc145",
    "#cfd05a",
    "#dddf68",
    "#ffff89",
    "#bfc16d",
    "#71724f",
    "#4f4bae",
    "#0100d4",
    "#221c79",
    "#545084",
    "#8c8b3e",
    "#bcbc3f",
  ],
  by: [
    "#e13939",
    "#e05b5f",
    "#e27077",
    "#efa1a9",
    "#a88489",
    "#4b6569",
    "#51a9a4",
    "#58bab2",
    "#406c66",
    "#72746f",
    "#a7312d",
    "#df3022",
  ],
  nc: [
    "#8e8e8e",
    "#a8a8a8",
    "#bdbdbd",
    "#efefef",
    "#b9b9b9",
    "#7d7d7d",
    "#737373",
    "#4d4d4d",
    "#333333",
    "#4f4f4f",
    "#646464",
    "#828282",
  ],
};

export default function ColorBlindness() {
  const [condition, setCondition] = useState<keyof typeof conditions>("normal");

  const colors = conditions[condition];

  return (
    <>
      <select
        onChange={(event) => {
          setCondition(
            (event.target as HTMLSelectElement)
              .value as keyof typeof conditions,
          );
        }}
      >
        <option value="normal">Normal Perception</option>
        <option value="rg">Red-Green Blindness</option>
        <option value="by">Blue-Yellow Blindness</option>
        <option value="nc">No Color Perception</option>
      </select>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 303 303">
        <defs>
          <style>
            {`path{stroke:#231f20;stroke-miterlimit:10;stroke-width:1px}`}
          </style>
        </defs>
        <path
          fill={colors[0]}
          d="m231.1 23.3-79.3 127.3-.4-.8 5-149c26 .6 52 7.8 74.7 22.5Z"
        />
        <path
          fill={colors[1]}
          d="M284.6 80.3 152.2 151v-.9l78.9-126.6c22.2 13.5 41 32.8 53.5 57Z"
        />
        <path
          fill={colors[2]}
          d="m302.3 156.4-150-5 .6-.8 131.6-70.2c12.5 22.8 19.1 49 17.8 76Z"
        />
        <path
          fill={colors[3]}
          d="m279.7 231.1-127.3-79.3.7-.4 149.1 5c-.6 26-7.9 52-22.5 74.7Z"
        />
        <path
          fill={colors[4]}
          d="M222.7 284.6 152 152.2h.9l126.5 78.9a143.7 143.7 0 0 1-56.8 53.5Z"
        />
        <path
          fill={colors[5]}
          d="m146.6 302.3 5-150 .8.6 70.2 131.6a143.5 143.5 0 0 1-76 17.8Z"
        />
        <path
          fill={colors[6]}
          d="m71.8 279.7 79.4-127.3.4.7-5 149.1c-26-.6-52-7.9-74.8-22.5Z"
        />
        <path
          fill={colors[7]}
          d="M18.4 222.7 150.8 152v.9l-79 126.5a143.7 143.7 0 0 1-53.4-56.8Z"
        />
        <path
          fill={colors[8]}
          d="m.7 146.6 149.9 5-.5.8-131.6 70.2a143.7 143.7 0 0 1-17.8-76Z"
        />
        <path
          fill={colors[9]}
          d="m23.3 71.8 127.3 79.4-.8.4-149-5c.6-26 7.8-52 22.5-74.8Z"
        />
        <path
          fill={colors[10]}
          d="M80.3 18.4 151 150.8h-.9l-126.6-79a144 144 0 0 1 57-53.4Z"
        />
        <path
          fill={colors[11]}
          d="m156.4.7-5 149.9-.8-.5L80.4 18.5C103.2 6 129.4-.6 156.4.7Z"
        />
      </svg>
    </>
  );
}
