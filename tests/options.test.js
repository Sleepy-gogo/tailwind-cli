import { expect, test } from 'vitest';
import { getOptions } from '../src/lib/utils.js';
import mock from 'mock-fs';

test('basic', async () => {
  mock({
    'test/options': {
      'file1.js':
        'export default { name: "option 1", action: () => "Action 1 works", type: "option"};',
      'file2.js':
        'export default { name: "option 2", action: () => "Action 2 works", type: "option"};'
    }
  });

  const options = await getOptions('test/options');

  expect(options).toHaveLength(2);
});
