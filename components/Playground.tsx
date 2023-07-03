import load, { ComponentName } from "cds-design";
import { useState, useEffect, useRef } from "react";

import manifest from "cds-design/dist/custom-elements.json";

export default function Playground(name) {
  const componentName = name.name;
  const ComponentTagName = `cds-${componentName}`;

  load(componentName);
  let attrList = [];
  const attr = manifest.modules.find((module) =>
    module.path.includes(componentName)
  )?.declarations[0]?.attributes;
  const [attrOptions, setAttrOptions] = useState(getAttrOptions());
  const [currentAttr, setCurrentAttr] = useState(getIniAttr());
  const [code, setCode] = useState(genIniCode());
  const [component, setComponent] = useState();

  function genIniCode() {
    return <ComponentTagName></ComponentTagName>;
  }

  function getIniAttr() {
    return sanitizeAttr().reduce((obj, item) => {
      obj[item.name] = item.default;
      return obj;
    }, {});
  }

  function sanitizeAttr() {
    attrList = attr.map((attribute) => {
      let inputType;
      const typeValue = attribute.type.text.replace(/['" ]/g, "").split("|");
      switch (typeValue[0]) {
        case "number":
          inputType = "number";
          break;
        case "boolean":
          inputType = "checkbox";
          break;
        case "string":
          inputType = "text";
          break;
        default:
          inputType = "radio";
          break;
      }
      return {
        name: attribute.name,
        type: typeValue,
        default: attribute.default?.replace(/['" ]/g, ""),
        inputType: inputType,
      };
    });
    return attrList;
  }

  function handleAttrChange(event) {
    const attrName = event.target.name;
    switch (event.target.type) {
      case "checkbox":
      case "radio":
        const attrDataValue = event.target.getAttribute("data-value");
        if (event.target.checked) {
          setCurrentAttr((currentAttr) => {
            return { ...currentAttr, [attrName]: attrDataValue };
          });
        } else {
          setCurrentAttr((currentAttr) => {
            const { [attrName]: attrValue, ...rest } = currentAttr;
            return rest;
          });
        }
        break;
      case "number":
      case "text":
        const attrValue = event.target.value;
        setCurrentAttr((currentAttr) => {
          return { ...currentAttr, [attrName]: attrValue };
        });
        break;
    }
  }

  function getAttrOptions() {
    return sanitizeAttr().map(({ name, type, inputType }) => {
      return (
        <>
          <span>{name}</span>
          {type.map((t, index) => {
            index = useRef(null);
            return (
              <>
                <input
                  type={inputType}
                  data-value={t}
                  name={name}
                  key={index}
                  ref={index}
                  onChange={(event) => handleAttrChange(event)}
                ></input>
                <span>{type.length > 1 ? t : null}</span>
              </>
            );
          })}
        </>
      );
    });
  }

  useEffect(() => {
    setCode(<ComponentTagName {...currentAttr}></ComponentTagName>);
  }, [currentAttr]);

  useEffect(() => {
    setComponent(code);
  }, [code]);

  function addInnerText(event) {
    setComponent(
      <ComponentTagName {...currentAttr}>{event.target.value}</ComponentTagName>
    );
  }

  useEffect(() => {
    attrOptions.forEach((goption) => {
      const input = goption.props.children[1][0].props.children[0].ref.current;

      if (input.type === "radio") {
        if (input.getAttribute("data-value") === currentAttr[input.name]) {
          input.checked = true;
        }
      }
      if (input.type === "checkbox") {
        if (currentAttr[input.name] === "false") {
          input.checked = true;
        }
      }
    });
  });

  return (
    // @ts-ignore
    <>
      <div>{component}</div>
      <div>{attrOptions}</div>
      <div></div>
      {componentName !== "avatar" &&
      componentName !== "progress" &&
      componentName !== "slider" &&
      componentName !== "input" ? (
        <input type="text" onChange={(event) => addInnerText(event)}></input>
      ) : (
        console.log("")
      )}
      {Object.keys(currentAttr).map((attr) => {
        return !currentAttr[attr] || currentAttr[attr].length === 0 ? (
          <div>{`${attr} is required`}</div>
        ) : (
          console.log("")
        );
      })}
    </>
  );
}
