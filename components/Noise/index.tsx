import { useRef, useState } from "react"
import {useMount} from "ahooks"
import styles from "./style.module.css"
import {load} from "cds-design"


export default function Noise() {

    const [width, setWidth] = useState(200)
    const [frequency, setFrequency] = useState(width / 1000)

    function randomize() {
        const base = width / 1000; // 1/1000 of the width
        const seed = Math.random();
        const random = (seed * (2 * base) + base * (1 - seed)); // random number between base and 2 * base
        setFrequency(
            Number(random.toFixed(2))
        );
    }

    const SVGRef = useRef<SVGSVGElement>(null);

    const sliderRef = useRef<HTMLInputElement>(null);

    function download() {
        const link = document.createElement('a');
        link.download = 'noise.svg';
        link.href = `data:image/svg+xml;base64,${Buffer.from(SVGRef.current?.outerHTML || '').toString('base64')}`;
        link.click();
    }

    useMount(()=>{
        load("button","slider")
    })

    return (
        <>
        <div className={styles.wrapper}>
           
            <div className={styles.top}>
            
            <div className={styles.controls}>
            <button className={styles.button} onClick={randomize.bind(this)}>Randomize</button>
            <input type="range"
                
                ref={sliderRef}
                step={0.01}
                min={width / 1000}
                max={2 * width / 1000}
                value={frequency}
                onChange={() => {
                    setFrequency(Number(sliderRef.current?.value))
                }}/>
           
            </div>
            <button className={styles.button} onClick={download.bind(this)}>Download</button>
            </div>
             <svg
                ref={SVGRef}
                style={{
                    filter: 'grayscale(1)'
                }}
                viewBox="0 0 200 200" width={width} xmlns='http://www.w3.org/2000/svg'>
                <filter id='noiseFilter'>
                    <feTurbulence type='turbulance' baseFrequency={frequency} stitchTiles='stitch' />
                </filter>
                <rect width='100%' height='100%' filter='url(#noiseFilter)' />
            </svg>
            </div>
        </>
    )
}