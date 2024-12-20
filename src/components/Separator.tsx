export default async function Separator({ h }: { h: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 91"
      preserveAspectRatio="none"
      height={h}
      className={`w-full rotate-180 fill-[#d43a3a]`}
    >
      <path d="M0 .4V91h1000V.6c-67.6 41.7-265.8 71.8-499.8 71.8C265.8 72.4 67.3 42.1 0 .4z"></path>
    </svg>
  );
}
