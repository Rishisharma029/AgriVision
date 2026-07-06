/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { ThreeElements } from '@react-three/fiber'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {}
    }
  }
}
