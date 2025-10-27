// src/styled.d.ts
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      secondary: string
    }
    size: Record<string, unknown> // ✅ 修复：使用 Record
    mixin: Record<string, never>
  }
}
