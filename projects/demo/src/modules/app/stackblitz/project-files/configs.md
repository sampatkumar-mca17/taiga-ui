# angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "demo": {
      "root": "",
      "sourceRoot": "",
      "projectType": "application",
      "prefix": "my-app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/demo",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": [
              "node_modules/@taiga-ui/core/styles/taiga-ui-global.less",
              "node_modules/@taiga-ui/core/styles/theme/variables.less",
              "node_modules/@taiga-ui/core/styles/theme/wrapper.less",
              "src/styles.less"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {"browserTarget": "demo:build"}
        }
      }
    }
  },
  "defaultProject": "demo"
}
```

# tsconfig.json

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": ["node_modules/@types"],
    "lib": ["es2018", "dom"]
  },
  "angularCompilerOptions": {
    "enableIvy": false,
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true
  }
}
```

Ivy is disabled because of Stackblitz error: https://github.com/stackblitz/core/issues/1364