
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/about',
  component: ComponentCreator('/about'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/Array/concat',
  component: ComponentCreator('/docs/Array/concat'),
  exact: true,
  
},
{
  path: '/docs/Array/copyWithin',
  component: ComponentCreator('/docs/Array/copyWithin'),
  exact: true,
  
},
{
  path: '/docs/Array/entries',
  component: ComponentCreator('/docs/Array/entries'),
  exact: true,
  
},
{
  path: '/docs/Array/flat',
  component: ComponentCreator('/docs/Array/flat'),
  exact: true,
  
},
{
  path: '/docs/Array/from',
  component: ComponentCreator('/docs/Array/from'),
  exact: true,
  
},
{
  path: '/docs/Array/isArray',
  component: ComponentCreator('/docs/Array/isArray'),
  exact: true,
  
},
{
  path: '/docs/Array/of',
  component: ComponentCreator('/docs/Array/of'),
  exact: true,
  
},
{
  path: '/docs/Array/slice',
  component: ComponentCreator('/docs/Array/slice'),
  exact: true,
  
},
{
  path: '/docs/Function/apply',
  component: ComponentCreator('/docs/Function/apply'),
  exact: true,
  
},
{
  path: '/docs/Function/bind',
  component: ComponentCreator('/docs/Function/bind'),
  exact: true,
  
},
{
  path: '/docs/Function/call',
  component: ComponentCreator('/docs/Function/call'),
  exact: true,
  
},
{
  path: '/docs/Math/abs',
  component: ComponentCreator('/docs/Math/abs'),
  exact: true,
  
},
{
  path: '/docs/Math/clz32',
  component: ComponentCreator('/docs/Math/clz32'),
  exact: true,
  
},
{
  path: '/docs/Math/cos',
  component: ComponentCreator('/docs/Math/cos'),
  exact: true,
  
},
{
  path: '/docs/Math/floor',
  component: ComponentCreator('/docs/Math/floor'),
  exact: true,
  
},
{
  path: '/docs/Math/formulas',
  component: ComponentCreator('/docs/Math/formulas'),
  exact: true,
  
},
{
  path: '/docs/Math/fround',
  component: ComponentCreator('/docs/Math/fround'),
  exact: true,
  
},
{
  path: '/docs/Math/imul',
  component: ComponentCreator('/docs/Math/imul'),
  exact: true,
  
},
{
  path: '/docs/Math/max',
  component: ComponentCreator('/docs/Math/max'),
  exact: true,
  
},
{
  path: '/docs/Math/random',
  component: ComponentCreator('/docs/Math/random'),
  exact: true,
  
},
{
  path: '/docs/Math/sign',
  component: ComponentCreator('/docs/Math/sign'),
  exact: true,
  
},
{
  path: '/docs/Math/sin',
  component: ComponentCreator('/docs/Math/sin'),
  exact: true,
  
},
{
  path: '/docs/Math/tan',
  component: ComponentCreator('/docs/Math/tan'),
  exact: true,
  
},
{
  path: '/docs/Math/trunc',
  component: ComponentCreator('/docs/Math/trunc'),
  exact: true,
  
},
{
  path: '/docs/Number/parseFloat',
  component: ComponentCreator('/docs/Number/parseFloat'),
  exact: true,
  
},
{
  path: '/docs/Number/parseInt',
  component: ComponentCreator('/docs/Number/parseInt'),
  exact: true,
  
},
{
  path: '/docs/Object/assign',
  component: ComponentCreator('/docs/Object/assign'),
  exact: true,
  
},
{
  path: '/docs/Object/create',
  component: ComponentCreator('/docs/Object/create'),
  exact: true,
  
},
{
  path: '/docs/Object/defineProperties',
  component: ComponentCreator('/docs/Object/defineProperties'),
  exact: true,
  
},
{
  path: '/docs/Object/defineProperty',
  component: ComponentCreator('/docs/Object/defineProperty'),
  exact: true,
  
},
{
  path: '/docs/Object/entries',
  component: ComponentCreator('/docs/Object/entries'),
  exact: true,
  
},
{
  path: '/docs/Object/freeze',
  component: ComponentCreator('/docs/Object/freeze'),
  exact: true,
  
},
{
  path: '/docs/Object/fromEntries',
  component: ComponentCreator('/docs/Object/fromEntries'),
  exact: true,
  
},
{
  path: '/docs/Object/getOwnPropertyDescriptor',
  component: ComponentCreator('/docs/Object/getOwnPropertyDescriptor'),
  exact: true,
  
},
{
  path: '/docs/Object/getOwnPropertyDescriptors',
  component: ComponentCreator('/docs/Object/getOwnPropertyDescriptors'),
  exact: true,
  
},
{
  path: '/docs/Object/getOwnPropertyNames',
  component: ComponentCreator('/docs/Object/getOwnPropertyNames'),
  exact: true,
  
},
{
  path: '/docs/Object/getOwnPropertySymbols',
  component: ComponentCreator('/docs/Object/getOwnPropertySymbols'),
  exact: true,
  
},
{
  path: '/docs/Object/getPrototypeOf',
  component: ComponentCreator('/docs/Object/getPrototypeOf'),
  exact: true,
  
},
{
  path: '/docs/Object/hasOwnProperty',
  component: ComponentCreator('/docs/Object/hasOwnProperty'),
  exact: true,
  
},
{
  path: '/docs/Object/is',
  component: ComponentCreator('/docs/Object/is'),
  exact: true,
  
},
{
  path: '/docs/Object/isExtensible',
  component: ComponentCreator('/docs/Object/isExtensible'),
  exact: true,
  
},
{
  path: '/docs/Object/isFrozen',
  component: ComponentCreator('/docs/Object/isFrozen'),
  exact: true,
  
},
{
  path: '/docs/Object/isPrototypeOf',
  component: ComponentCreator('/docs/Object/isPrototypeOf'),
  exact: true,
  
},
{
  path: '/docs/Object/isSealed',
  component: ComponentCreator('/docs/Object/isSealed'),
  exact: true,
  
},
{
  path: '/docs/Object/keys',
  component: ComponentCreator('/docs/Object/keys'),
  exact: true,
  
},
{
  path: '/docs/Object/preventExtensions',
  component: ComponentCreator('/docs/Object/preventExtensions'),
  exact: true,
  
},
{
  path: '/docs/Object/propertyIsEnumerable',
  component: ComponentCreator('/docs/Object/propertyIsEnumerable'),
  exact: true,
  
},
{
  path: '/docs/Object/seal',
  component: ComponentCreator('/docs/Object/seal'),
  exact: true,
  
},
{
  path: '/docs/Object/setPrototypeOf',
  component: ComponentCreator('/docs/Object/setPrototypeOf'),
  exact: true,
  
},
{
  path: '/docs/Object/values',
  component: ComponentCreator('/docs/Object/values'),
  exact: true,
  
},
{
  path: '/docs/Promise/promise',
  component: ComponentCreator('/docs/Promise/promise'),
  exact: true,
  
},
{
  path: '/docs/Promise/promiseA+',
  component: ComponentCreator('/docs/Promise/promiseA+'),
  exact: true,
  
},
{
  path: '/docs/Promise/promiseWheel',
  component: ComponentCreator('/docs/Promise/promiseWheel'),
  exact: true,
  
},
{
  path: '/docs/Proxy/proxy',
  component: ComponentCreator('/docs/Proxy/proxy'),
  exact: true,
  
},
{
  path: '/docs/String/charAt',
  component: ComponentCreator('/docs/String/charAt'),
  exact: true,
  
},
{
  path: '/docs/String/charCodeAt',
  component: ComponentCreator('/docs/String/charCodeAt'),
  exact: true,
  
},
{
  path: '/docs/String/codePointAt',
  component: ComponentCreator('/docs/String/codePointAt'),
  exact: true,
  
},
{
  path: '/docs/String/concat',
  component: ComponentCreator('/docs/String/concat'),
  exact: true,
  
},
{
  path: '/docs/String/endsWith',
  component: ComponentCreator('/docs/String/endsWith'),
  exact: true,
  
},
{
  path: '/docs/String/fromCharCode',
  component: ComponentCreator('/docs/String/fromCharCode'),
  exact: true,
  
},
{
  path: '/docs/String/fromCodePoint',
  component: ComponentCreator('/docs/String/fromCodePoint'),
  exact: true,
  
},
{
  path: '/docs/String/includes',
  component: ComponentCreator('/docs/String/includes'),
  exact: true,
  
},
{
  path: '/docs/String/indexOf',
  component: ComponentCreator('/docs/String/indexOf'),
  exact: true,
  
},
{
  path: '/docs/String/lastIndexOf',
  component: ComponentCreator('/docs/String/lastIndexOf'),
  exact: true,
  
},
{
  path: '/docs/String/localeCompare',
  component: ComponentCreator('/docs/String/localeCompare'),
  exact: true,
  
},
{
  path: '/docs/String/match',
  component: ComponentCreator('/docs/String/match'),
  exact: true,
  
},
{
  path: '/docs/String/normalize',
  component: ComponentCreator('/docs/String/normalize'),
  exact: true,
  
},
{
  path: '/docs/String/padEnd',
  component: ComponentCreator('/docs/String/padEnd'),
  exact: true,
  
},
{
  path: '/docs/String/padStart',
  component: ComponentCreator('/docs/String/padStart'),
  exact: true,
  
},
{
  path: '/docs/String/repeat',
  component: ComponentCreator('/docs/String/repeat'),
  exact: true,
  
},
{
  path: '/docs/String/replace',
  component: ComponentCreator('/docs/String/replace'),
  exact: true,
  
},
{
  path: '/docs/String/search',
  component: ComponentCreator('/docs/String/search'),
  exact: true,
  
},
{
  path: '/docs/String/slice',
  component: ComponentCreator('/docs/String/slice'),
  exact: true,
  
},
{
  path: '/docs/String/split',
  component: ComponentCreator('/docs/String/split'),
  exact: true,
  
},
{
  path: '/docs/String/startsWith',
  component: ComponentCreator('/docs/String/startsWith'),
  exact: true,
  
},
{
  path: '/docs/String/substr',
  component: ComponentCreator('/docs/String/substr'),
  exact: true,
  
},
{
  path: '/docs/String/substring',
  component: ComponentCreator('/docs/String/substring'),
  exact: true,
  
},
{
  path: '/docs/String/to...Case',
  component: ComponentCreator('/docs/String/to...Case'),
  exact: true,
  
},
{
  path: '/docs/String/trim',
  component: ComponentCreator('/docs/String/trim'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
