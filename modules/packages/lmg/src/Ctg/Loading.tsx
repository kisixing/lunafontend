import React from "react";
interface IProps {
    style: React.CSSProperties

}
export default (props: IProps) => {
    return (
        <svg {...props} width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" >
            <circle cx="50" cy="50" fill="none" stroke="#2062b3" strokeWidth="2" r="14" strokeDasharray="65.97344572538566 23.991148575128552" transform="rotate(42.1276 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite">
                </animateTransform>
            </circle>
        </svg>
    )
}
export const Loading = (props: IProps) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="101px" height="101px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <defs>
                <clipPath id="ldio-ohgzj8fs6z-cp" x="0" y="0" width="100" height="100">
                    <path d="M81.3,58.7H18.7c-4.8,0-8.7-3.9-8.7-8.7v0c0-4.8,3.9-8.7,8.7-8.7h62.7c4.8,0,8.7,3.9,8.7,8.7v0C90,54.8,86.1,58.7,81.3,58.7z"></path>
                </clipPath>
            </defs>
            <path fill="none" stroke="#0051a2" stroke-width="2.7928" d="M82 63H18c-7.2,0-13-5.8-13-13v0c0-7.2,5.8-13,13-13h64c7.2,0,13,5.8,13,13v0C95,57.2,89.2,63,82,63z"></path>
            <g clip-path="url(#ldio-ohgzj8fs6z-cp)">
                <g transform="translate(36.4342 0)">
                    <rect x="-100" y="0" width="25" height="100" fill="#1b75be"></rect>
                    <rect x="-75" y="0" width="25" height="100" fill="#408ee0"></rect>
                    <rect x="-50" y="0" width="25" height="100" fill="#89bff8"></rect>
                    <rect x="-25" y="0" width="25" height="100" fill="#e3f1ff"></rect>
                    <rect x="0" y="0" width="25" height="100" fill="#1b75be"></rect>
                    <rect x="25" y="0" width="25" height="100" fill="#408ee0"></rect>
                    <rect x="50" y="0" width="25" height="100" fill="#89bff8"></rect>
                    <rect x="75" y="0" width="25" height="100" fill="#e3f1ff"></rect>
                    <animateTransform attributeName="transform" type="translate" dur="0.5586592178770949s" repeatCount="indefinite" keyTimes="0;1" values="0;100"></animateTransform>
                </g>
            </g>
        </svg>
    )
}

