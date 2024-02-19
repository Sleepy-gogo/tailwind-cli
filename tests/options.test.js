import { expect, test } from 'vitest';
import { getOptions } from '../src/lib/utils.js';

const options = await getOptions('tests/test-options');

test('Loads all the available options', () => {
  expect(options).toHaveLength(3);
});

test('Loads all the available suboptions', () => {
  const dirOption = options.find((option) => option.type === 'dir');
  expect(dirOption.options).toHaveLength(1);
});

test('Option actions work', () => {
  const option = options.find((option) => option.name === 'Option 1');
  expect(option.action()).toBe('Action working');
});
