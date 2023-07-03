import { useState } from 'react';


export function useHSL($h: number, $s: number, $l: number) {
    const [h, H] = useState($h);
    const [s, S] = useState($s);
    const [l, L] = useState($l);

    function HSL([$h, $s, $l]) {
        H($h);
        S($s);
        L($l);
    }

    return [
        { h, s, l },
        { H, S, L, HSL }
    ]
}