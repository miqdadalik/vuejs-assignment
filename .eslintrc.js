module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
        node: true,
        mocha: true
    },
    "globals": {
        "expect": true
    },
    extends: [
        'plugin:vue/recommended',
        'standard'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        "indent": [0, 4],
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "vue/html-indent": [0, 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 1,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "vue/html-self-closing": [0, {
            "html": {
                "void": "never",
                "normal": "never",
                "component": "never"
            }
        }]
    }
  }