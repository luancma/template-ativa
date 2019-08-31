module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    "prettier/prettier": 'error',
    "react/jsx-no-target-blank":'off',
    "func-names":'off',
    "max-len":'off',
    "no-unused-vars":'off',
    "no-script-url":'off',
    "react/no-unescaped-entities":'off',
    "import/no-unresolved":'off',
    "import/no-extraneous-dependencies":'off',
    "no-console":'off',
    "no-undef":'off',
    "react/no-array-index-key":'off',
    "import/prefer-default-export":'off',
    "global-require":'off',
    "react/prop-types":'off',
    "comma-dangle": [
      "off"
    ],
    "import/extensions":'off',
    "jsx-a11y/label-has-for":'off',
    "guard-for-in": [
      "warn"
    ],
    "no-restricted-syntax": [
      "warn"
    ],
    "object-curly-spacing": [
      "off"
    ],
    "padded-blocks": [
      "off"
    ],
    "react/jsx-closing-bracket-location": [
      "off"
    ],
    "react/jsx-filename-extension": [
      'warn',
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "react/jsx-space-before-closing": [
      "off"
    ],
    "react/prefer-stateless-function": [
      "off"
    ],
    "no-underscore-dangle": [
      "error",
      {
        "allowAfterThis": true
      }
    ],
    "react/jsx-no-bind":'off',
    "react/no-multi-comp":'off',
    "no-plusplus":'off',
    "no-shadow":'off',
    "react/sort-comp": [
      "warn"
    ],
    "class-methods-use-this": [
      "warn"
    ]
  },
};
