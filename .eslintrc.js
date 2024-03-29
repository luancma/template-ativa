module.exports = {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    },
    "env": {
      "browser": true,
      "node": true,
      "mocha": true
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
      "react/jsx-no-target-blank": 0,
      "func-names": 0,
      "max-len": 0,
      "no-unused-vars": 0,
      "no-script-url": 0,
      "react/no-unescaped-entities": 0,
      "import/no-unresolved": 0,
      "import/no-extraneous-dependencies": 0,
      "no-console": 0,
      "no-undef": 0,
      "react/no-array-index-key": 0,
      "import/prefer-default-export": 0,
      "global-require": 0,
      "react/prop-types": 0,
      "comma-dangle": [
        "off"
      ],
      "parser": "babel-eslint",
      "rules": {
        "quotes": [
          2,
          "single"
        ],
        "strict": [
          2,
          "never"
        ],
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react/react-in-jsx-scope": 2
      },
      "import/extensions": 0,
      "jsx-a11y/label-has-for": 0,
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
        1,
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
      "react/jsx-no-bind": 0,
      "react/no-multi-comp": 0,
      "no-plusplus": 0,
      "no-shadow": 0,
      "react/sort-comp": [
        "warn"
      ],
      "class-methods-use-this": [
        "warn"
      ]
    },
    "plugins": [
      "react"
    ]
};
