export default function LoadingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="30"
      height="30"
    >
      <g>
        <circle
          stroke-linecap="round"
          fill="none"
          stroke-dasharray="32.98672286269283 32.98672286269283"
          stroke="#FFFFFF"
          stroke-width="8"
          r="21"
          cy="50"
          cx="50"
        >
          <animateTransform
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1.25s"
            repeatCount="indefinite"
            type="rotate"
            attributeName="transform"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  );
}
