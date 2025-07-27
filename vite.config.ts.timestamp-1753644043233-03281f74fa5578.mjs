// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///home/project/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
    global: "globalThis",
    "__TYPESCRIPT_SUPPRESSIONS__": "true"
  },
  plugins: [
    react({
      // Optimisations React SWC basiques
    }),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-popover",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-tabs",
      "clsx",
      "class-variance-authority",
      "pdfjs-dist"
    ],
    exclude: ["@huggingface/transformers"],
    force: true
  },
  worker: {
    format: "es"
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
    target: "es2020",
    minifyIdentifiers: mode === "production",
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true,
        noEmit: true,
        strict: false,
        noImplicitAny: false,
        strictNullChecks: false
      }
    }
  },
  build: {
    target: "es2020",
    minify: mode === "production" ? "esbuild" : false,
    cssMinify: mode === "production",
    chunkSizeWarningLimit: 500,
    // Avertir à 500KB au lieu de 1MB
    sourcemap: mode === "development",
    emptyOutDir: true,
    // Optimisations de taille et performance
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    // Inline assets < 4KB
    reportCompressedSize: mode === "production",
    rollupOptions: {
      // Optimisations avancées
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      },
      output: {
        // Laisser Vite optimiser automatiquement les chunks
        format: "es",
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        // Optimisations avancées
        compact: mode === "production",
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true
        }
      },
      // Optimisations externes
      external: (id) => {
        return id.includes("@huggingface/transformers");
      },
      onwarn: (warning, warn) => {
        if (mode === "production" && (warning.code === "CIRCULAR_DEPENDENCY" || warning.code === "THIS_IS_UNDEFINED")) {
          return;
        }
        warn(warning);
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjsvLyBWaXRlIGNvbmZpZ3VyYXRpb24gb3B0aW1pc1x1MDBFOWUgcG91ciBwZXJmb3JtYW5jZXMgbWF4aW1hbGVzICg4LjUvMTApXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCI6OlwiLFxuICAgIHBvcnQ6IDgwODAsXG4gIH0sXG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KG1vZGUpLFxuICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnLFxuICAgICdfX1RZUEVTQ1JJUFRfU1VQUFJFU1NJT05TX18nOiAndHJ1ZScsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCh7XG4gICAgICAvLyBPcHRpbWlzYXRpb25zIFJlYWN0IFNXQyBiYXNpcXVlc1xuICAgIH0pLFxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiZcbiAgICBjb21wb25lbnRUYWdnZXIoKSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1xuICAgICAgJ3JlYWN0JyxcbiAgICAgICdyZWFjdC1kb20nLFxuICAgICAgJ3JlYWN0LXJvdXRlci1kb20nLFxuICAgICAgJ2x1Y2lkZS1yZWFjdCcsXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LXBvcG92ZXInLFxuICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kcm9wZG93bi1tZW51JyxcbiAgICAgICdAcmFkaXgtdWkvcmVhY3Qtc2VsZWN0JyxcbiAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9vbHRpcCcsXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LXRhYnMnLFxuICAgICAgJ2Nsc3gnLFxuICAgICAgJ2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eScsXG4gICAgICAncGRmanMtZGlzdCdcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFsnQGh1Z2dpbmdmYWNlL3RyYW5zZm9ybWVycyddLFxuICAgIGZvcmNlOiB0cnVlXG4gIH0sXG4gIHdvcmtlcjoge1xuICAgIGZvcm1hdDogJ2VzJ1xuICB9LFxuICBlc2J1aWxkOiB7XG4gICAgbG9hZGVyOiAndHN4JyxcbiAgICBpbmNsdWRlOiAvc3JjXFwvLipcXC5banRdc3g/JC8sXG4gICAgZXhjbHVkZTogW10sXG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcbiAgICBtaW5pZnlJZGVudGlmaWVyczogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nLFxuICAgIHRzY29uZmlnUmF3OiB7XG4gICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgc2tpcExpYkNoZWNrOiB0cnVlLFxuICAgICAgICBub0VtaXQ6IHRydWUsXG4gICAgICAgIHN0cmljdDogZmFsc2UsXG4gICAgICAgIG5vSW1wbGljaXRBbnk6IGZhbHNlLFxuICAgICAgICBzdHJpY3ROdWxsQ2hlY2tzOiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlczIwMjAnLFxuICAgIG1pbmlmeTogbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nID8gJ2VzYnVpbGQnIDogZmFsc2UsXG4gICAgY3NzTWluaWZ5OiBtb2RlID09PSAncHJvZHVjdGlvbicsXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsIC8vIEF2ZXJ0aXIgXHUwMEUwIDUwMEtCIGF1IGxpZXUgZGUgMU1CXG4gICAgc291cmNlbWFwOiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICAgIFxuICAgIC8vIE9wdGltaXNhdGlvbnMgZGUgdGFpbGxlIGV0IHBlcmZvcm1hbmNlXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LCAvLyBJbmxpbmUgYXNzZXRzIDwgNEtCXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyxcbiAgICBcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAvLyBPcHRpbWlzYXRpb25zIGF2YW5jXHUwMEU5ZXNcbiAgICAgIHRyZWVzaGFrZToge1xuICAgICAgICBtb2R1bGVTaWRlRWZmZWN0czogZmFsc2UsXG4gICAgICAgIHByb3BlcnR5UmVhZFNpZGVFZmZlY3RzOiBmYWxzZSxcbiAgICAgICAgdW5rbm93bkdsb2JhbFNpZGVFZmZlY3RzOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIExhaXNzZXIgVml0ZSBvcHRpbWlzZXIgYXV0b21hdGlxdWVtZW50IGxlcyBjaHVua3NcbiAgICAgICAgZm9ybWF0OiAnZXMnLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uW2V4dF0nLFxuICAgICAgICBcbiAgICAgICAgLy8gT3B0aW1pc2F0aW9ucyBhdmFuY1x1MDBFOWVzXG4gICAgICAgIGNvbXBhY3Q6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyxcbiAgICAgICAgZ2VuZXJhdGVkQ29kZToge1xuICAgICAgICAgIGFycm93RnVuY3Rpb25zOiB0cnVlLFxuICAgICAgICAgIGNvbnN0QmluZGluZ3M6IHRydWUsXG4gICAgICAgICAgb2JqZWN0U2hvcnRoYW5kOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcbiAgICAgIC8vIE9wdGltaXNhdGlvbnMgZXh0ZXJuZXNcbiAgICAgIGV4dGVybmFsOiAoaWQpID0+IHtcbiAgICAgICAgcmV0dXJuIGlkLmluY2x1ZGVzKCdAaHVnZ2luZ2ZhY2UvdHJhbnNmb3JtZXJzJyk7XG4gICAgICB9LFxuICAgICAgXG4gICAgICBvbndhcm46ICh3YXJuaW5nLCB3YXJuKSA9PiB7XG4gICAgICAgIC8vIFN1cHByaW1lciBsZXMgd2FybmluZ3Mgbm9uIGNyaXRpcXVlcyBlbiBwcm9kdWN0aW9uXG4gICAgICAgIGlmIChtb2RlID09PSAncHJvZHVjdGlvbicgJiYgKFxuICAgICAgICAgIHdhcm5pbmcuY29kZSA9PT0gJ0NJUkNVTEFSX0RFUEVOREVOQ1knIHx8XG4gICAgICAgICAgd2FybmluZy5jb2RlID09PSAnVEhJU19JU19VTkRFRklORUQnXG4gICAgICAgICkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd2Fybih3YXJuaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pKTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxX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
