export const SHORT_OPTIONS = [
  { label: 'Short text', value: 'pl' },
  { label: 'Longer text to show wrapping behavior', value: 'de' },
  { label: 'Just another', value: 'fr' },
  { label: 'One more', value: 'it' },
  { label: 'Long test text for search and wrapping demonstration', value: 'test' },
];

export const LONG_OPTIONS = Array.from({ length: 50 }, (_, i) => ({
  label: `Option ${i + 1} – long name to show overflow behavior`,
  value: `opt_${i + 1}`,
}));

export const MIXED_OPTIONS = [
  { label: 'Short', value: 1 },
  { label: 'Slightly longer text', value: 2 },
  { label: 'Very long option that might not fit in one line on a narrow screen', value: 3 },
  { label: '🎉 Longer text with emoji and wrapping behavior', value: 4 },
  { label: 'Last one', value: 5 },
];

export const CATEGORY_OPTIONS = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Sports & Recreation', value: 'sport' },
  { label: 'Home & Garden', value: 'home' },
  { label: 'Automotive', value: 'auto' },
];

export const CITY_OPTIONS = [
  { label: 'Warsaw', value: 'waw' },
  { label: 'Madrid', value: 'mad' },
  { label: 'Wroclaw', value: 'wro' },
  { label: 'Paris', value: 'par' },
  { label: 'Lisbon', value: 'lis' },
  { label: 'Berlin', value: 'ber' },
];

export const COLOR_OPTIONS = [
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Black', value: 'black' },
  { label: 'White', value: 'white' },
  { label: 'Purple', value: 'purple' },
  { label: 'Orange', value: 'orange' },
];

export const SIZE_OPTIONS = [
  { label: 'Extra Small (XS)', value: 'xs' },
  { label: 'Small (S)', value: 's' },
  { label: 'Medium (M)', value: 'm' },
  { label: 'Large (L)', value: 'l' },
  { label: 'Extra Large (XL)', value: 'xl' },
  { label: 'Double Extra Large (XXL)', value: 'xxl' },
];

export const STATUS_OPTIONS = [
  { label: '✅ Active', value: 'active' },
  { label: '⏳ Pending', value: 'pending' },
  { label: '❌ Inactive', value: 'inactive' },
  { label: '⚠️ Suspended', value: 'suspended' },
  { label: '🔒 Locked', value: 'locked' },
  { label: '✨ Archived', value: 'archived' },
];

export const MONTH_OPTIONS = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

export const LOREM_IPSUM_OPTIONS = [
  { label: 'Lorem ipsum dolor sit amet', value: 'lorem01' },
  { label: 'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.', value: 'lorem02' },
  { label: 'Sed do eiusmod tempor', value: 'lorem03' },
  { label: 'Incididunt ut labore et dolore', value: 'lorem04' },
  { label: 'Magna aliqua', value: 'lorem05' },
  { label: 'Ut enim ad minim veniam', value: 'lorem06' },
  { label: 'Quis nostrud exercitation', value: 'lorem07' },
  { label: 'Ullamco laboris nisi', value: 'lorem08' },
  { label: 'Ut aliquip ex ea commodo', value: 'lorem09' },
  { label: 'Duis aute irure dolor', value: 'lorem10' },
  { label: 'In reprehenderit in voluptate', value: 'lorem11' },
  { label: 'Velit esse cillum dolore', value: 'lorem12' },
  { label: 'Eu fugiat nulla pariatur', value: 'lorem13' },
  { label: 'Excepteur sint occaecat', value: 'lorem14' },
  { label: 'Cupidatat non proident', value: 'lorem15' },
  { label: 'Sunt in culpa qui officia', value: 'lorem16' },
  { label: 'Deserunt mollit anim id', value: 'lorem17' },
  { label: 'Est laborum', value: 'lorem18' },
  { label: 'Sed ut perspiciatis unde', value: 'lorem19' },
  { label: 'Omnis iste natus error', value: 'lorem20' },
  { label: 'Sit voluptatem accusantium', value: 'lorem21' },
  { label: 'Doloremque laudantium', value: 'lorem22' },
  { label: 'Totam rem aperiam', value: 'lorem23' },
  { label: 'Eaque ipsa quae ab illo', value: 'lorem24' },
  { label: 'Inventore veritatis et quasi', value: 'lorem25' },
  { label: 'Architecto beatae vitae', value: 'lorem26' },
  { label: 'Dicta sunt explicabo', value: 'lorem27' },
  { label: 'Nemo enim ipsam voluptatem', value: 'lorem28' },
  { label: 'Quia voluptas sit aspernatur', value: 'lorem29' },
  { label: 'Aut odit aut fugit', value: 'lorem30' },
];

export const FRUITS_AND_VEGGIES_FLATTENED = [
  { type: 'group', label: 'Fruits' },
  { type: 'option', value: 'apple', label: 'Apple' },
  { type: 'option', value: 'banana', label: 'Banana' },
  { type: 'option', value: 'cherry', label: 'Cherry' },
  { type: 'option', value: 'grape', label: 'Grape' },
  { type: 'option', value: 'mango', label: 'Mango' },
  { type: 'group', label: 'Vegetables' },
  { type: 'option', value: 'carrot', label: 'Carrot' },
  { type: 'option', value: 'broccoli', label: 'Broccoli' },
  { type: 'option', value: 'spinach', label: 'Spinach' },
  { type: 'option', value: 'tomato', label: 'Tomato' },
  { type: 'group', label: 'Nuts' },
  { type: 'option', value: 'walnut', label: 'Walnut' },
  { type: 'option', value: 'almond', label: 'Almond' },
  { type: 'option', value: 'cashew', label: 'Cashew' },
];

export const FRUITS_AND_VEGGIES_NESTED = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'grape', label: 'Grape' },
      { value: 'mango', label: 'Mango' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
      { value: 'tomato', label: 'Tomato' },
    ],
  },
  {
    label: 'Nuts',
    options: [
      { value: 'walnut', label: 'Walnut' },
      { value: 'almond', label: 'Almond' },
      { value: 'cashew', label: 'Cashew' },
    ],
  },
];