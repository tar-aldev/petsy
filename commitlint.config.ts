import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
  rules: {
    'references-empty': [RuleConfigSeverity.Error, 'never'],
  },
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['CU-'],
    },
  },
};

export default Configuration;
