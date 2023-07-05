import { Dela_Gothic_One } from "next/font/google"

const dela_gothic_one = Dela_Gothic_One({
  weight: "400",
  subsets: ['latin']
})

export default function Logo() {
  return (
    <span
      style={{
        ...dela_gothic_one.style,
        lineHeight: 1.4,
      }}
    >
      CDS
    </span>
  );
}
