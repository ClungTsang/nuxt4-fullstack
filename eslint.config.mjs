// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    rules: {
      // 单独覆盖 member-delimiter-style 规则
      '@stylistic/member-delimiter-style': ['error', {
        linebreak: 'before',
        multiline: {
          delimiter: 'semi',    // 多行时使用分号
          requireLast: true     // 最后一行也需要分号
        },
        singleline: {
          delimiter: 'semi',    // 单行时使用分号
          requireLast: false    // 单行最后不需要分号
        }
      }]
    }
  }
);
