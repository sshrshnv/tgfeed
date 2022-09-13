import type { Component } from 'solid-js'

import { LogoIconPaths } from '~/ui/brand'

import styles from './bg-image.sss'

export const BgImage: Component = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={styles.base}
      viewBox="0 0 320 320"
      fill="none"
    >
      <g filter="url(#a)">
        <LogoIconPaths/>
      </g>
      <defs>
        <filter id="a" x="0" y="0" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend in2="shape" result="effect1_innerShadow_212_13"/>
        </filter>
      </defs>
    </svg>
  )
}
