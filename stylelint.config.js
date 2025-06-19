/** @type {import('stylelint/types/stylelint').Config} */
export default {
  extends: [
    'stylelint-config-clean-order',
  ],

  rules: {
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(_([a-z0-9]+-?)+){0,2}$',
      {
        resolveNestedSelectors: true,
        message: function expected(selectorValue) {
          return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/81kv7`
        },
      },
    ],

    'order/order': [
      [
        // Import-related rules
        { type: 'at-rule', name: 'import' },
        { type: 'at-rule', name: 'forward' },
        { type: 'at-rule', name: 'use' },

        // Variable-related rules
        'dollar-variables',
        'at-variables',
        'custom-properties',

        // At-rule-related rules
        { type: 'at-rule', name: 'custom-media' },
        { type: 'at-rule', name: 'function' },
        { type: 'at-rule', name: 'mixin' },
        { type: 'at-rule', name: 'extend' },
        { type: 'at-rule', name: 'include', hasBlock: false },

        // Declaration and rule-related rules
        'declarations',
        {
          type: 'rule',
          selector: /^&::[\w-]+/,
          hasBlock: true,
        },
        'rules',

        // Media query-related rules
        { type: 'at-rule', name: 'media', hasBlock: true },
        {
          type: 'at-rule',
          name: 'include',
          hasBlock: true,
        },
      ],
      {
        severity: 'warning',
      },
    ],
  },
}
