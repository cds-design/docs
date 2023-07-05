import React from "react";
import style from "./style.module.css";

export default function Texture() {
  return (
    <div className={style.parent}>
      <div className={style.blur}></div>
      <div className={style.grain}></div>
      <div className={style.grad}></div>
    </div>
  );
}
