# @qntm-code/translation-key-store

A simple key-value store for translation strings.

[![GitHub release](https://img.shields.io/github/release/bameyrick/translation-key-store.svg)](https://github.com/bameyrick/translation-key-store/releases)
[![Tests](https://github.com/bameyrick/translation-key-store/actions/workflows/tests.yml/badge.svg)](https://github.com/bameyrick/translation-key-store/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/bameyrick/translation-key-store/branch/main/graph/badge.svg)](https://codecov.io/gh/bameyrick/translation-key-store)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_translation-key-store&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bameyrick_translation-key-store)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_translation-key-store&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=bameyrick_translation-key-store)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_translation-key-store&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=bameyrick_translation-key-store)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_translation-key-store&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bameyrick_translation-key-store)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_translation-key-store&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=bameyrick_translation-key-store)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=bameyrick_translation-key-store&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=bameyrick_translation-key-store)

## Installation

```bash
npm i @qntm-code/translation-key-store
```

or

```bash
yarn add @qntm-code/translation-key-store
```

## Usage

First create a new store singleton. This can be done in a separate file and imported into other files.

```typescript
import { TranslationKeyStore } from '@qntm-code/translation-key-store';

// Create a new store singleton
export const store = new TranslationKeyStore();
```

When creating your store you can optionally enable logging of missing translations:

```typescript
import { TranslationKeyStore } from '@qntm-code/translation-key-store';

// Create a new store singleton
export const store = new TranslationKeyStore({ enableLogging: true });
```

Or you can provide your own missing translation handler:

```typescript
import { TranslationKeyStore } from '@qntm-code/translation-key-store';

// Create a new store singleton
export const store = new TranslationKeyStore({
  missingTranslationHandler: (language: string, key: string) => {
    // Do something with the missing translation information
  },
});
```

Once you have created your store you can populate it with translations:

```typescript
// Populate the store with translations
store.addLanguageNamespace('en', 'my-namespace', {
  'my-key': 'My translation',
  'my-other-key': 'My other translation',
  'my-parent-key': {
    'my-child-key': 'My child translation',
  },
});

// Populate the store with translations
store.addLanguageNamespace('fr', 'my-namespace', {
  'my-key': 'Ma traduction',
  'my-parent-key': {
    'my-child-key': 'Traduction enfant',
  },
});
```

You can then retrieve translations from the store. The function will return [messageformat](https://messageformat.github.io/) message functions for found values. If not it will return undefined.

```typescript
const translation = store.getTranslationValue('my-namespace.my-key', 'en');

if (translation) {
  const value = translation(); // My translation
}
```

You can provide a fallback language to the `getTranslationValue` function. If the translation is not found in the requested language it will look in the fallback language.

```typescript
const translation = store.getTranslationValue('my-namespace.my-other-key', 'fr', 'en');
if (translation) {
  const value = translation(); // My other translation
}
```

You can remove stored languages if your user changes their language in a SPA and you want to free up memory:

```typescript
store.removeLanguage('fr');
```
