import React from "react";
interface IProps {
    style: React.CSSProperties

}
export default (props: IProps) => {
    return (
        <svg {...props} width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" >
            <circle cx="50" cy="50" fill="none" stroke="#2062b3" stroke-width="2" r="14" stroke-dasharray="65.97344572538566 23.991148575128552" transform="rotate(42.1276 50 50)">
                <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite">
                </animateTransform>
            </circle>
        </svg>
    )
}