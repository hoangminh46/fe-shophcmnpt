export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-80 z-[999]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="50"
        height="50"
        className="block bg-white"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <circle
            stroke-dasharray="164.93361431346415 56.97787143782138"
            r="35"
            stroke-width="10"
            stroke="#000000"
            fill="none"
            cy="50"
            cx="50"
          >
            <animateTransform
              keyTimes="0;1"
              values="0 50 50;360 50 50"
              dur="1s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            ></animateTransform>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  );
}
