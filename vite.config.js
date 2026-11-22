import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const flagIconCssModuleStub = '\0flag-icon-css-module-stub'

// react-flag-icon-css imports flag styles as a CSS module. This app uses the
// global flag-icon-css stylesheet instead, so those default imports are empty.
function stubFlagIconCssModules() {
  return {
    name: 'stub-flag-icon-css-modules',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!importer) return null
      const fromPackage = importer.includes('react-flag-icon-css')
      const isFlagStyles = source.includes('flag-icon.css') || source.includes('/styles/main.css')
      if (!fromPackage || !isFlagStyles) return null
      return flagIconCssModuleStub
    },
    load(id) {
      if (id !== flagIconCssModuleStub) return null
      return 'export default {}'
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [stubFlagIconCssModules(), react()],
})
