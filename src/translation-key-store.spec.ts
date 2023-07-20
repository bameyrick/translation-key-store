import { TranslationKeyStore } from './translation-key-store';

describe(`TranslationKeyStore`, () => {
  it(`should add a language namespace`, () => {
    const store = new TranslationKeyStore();

    store.addLanguageNamespace('en', 'test', { test: 'test' });

    const result = store.getNamepaceForLanguage('en', 'test');

    expect(result).toBeDefined();
  });

  it(`should remove a language`, () => {
    const store = new TranslationKeyStore();

    store.addLanguageNamespace('en', 'test', { test: 'test' });

    store.removeLanguage('en');

    const result = store.getNamepaceForLanguage('en', 'test');

    expect(result).toBeUndefined();
  });

  it(`should get a namespace for a language`, () => {
    const store = new TranslationKeyStore();

    store.addLanguageNamespace('en', 'test', { test: 'test' });

    const result = store.getNamepaceForLanguage('en', 'test');

    expect(result).toBeDefined();
  });

  it(`should get a translation value for a given key and a given language `, () => {
    const store = new TranslationKeyStore();

    store.addLanguageNamespace('en', 'test', { test: { child: { doop: 'doop' } } });

    const result = store.getTranslationValue('test.test.child.doop', 'en');

    expect(result).toBeDefined();
    expect(result!()).toBe('doop');
  });

  it(`should log an error if translation is not found`, () => {
    const store = new TranslationKeyStore({ enableLogging: true });

    store.addLanguageNamespace('en', 'test', { test: 'test' });

    const consoleError = console.error;

    console.error = jest.fn();

    store.getTranslationValue('test.no', 'en', 'de');

    expect(console.error).toHaveBeenCalledWith(`Missing translation for key "test.no" in language "en"`);

    console.error = consoleError;
  });

  it(`should not log an error if translation is not found`, () => {
    const store = new TranslationKeyStore();

    store.addLanguageNamespace('en', 'test', { test: 'test' });

    const consoleError = console.error;

    console.error = jest.fn();

    store.getTranslationValue('test.no', 'en', 'de');

    expect(console.error).not.toHaveBeenCalled();

    console.error = consoleError;
  });

  it(`Should use a provided missing translation handler`, () => {
    const missingTranslationHandler = jest.fn();

    const store = new TranslationKeyStore({ missingTranslationHandler });

    store.addLanguageNamespace('en', 'test', { test: 'test' });

    store.getTranslationValue('test.no', 'en', 'de');

    expect(missingTranslationHandler).toHaveBeenCalledWith('en', 'test.no');
  });

  it(`should fall back to the default language store if the language store is not found`, () => {
    const store = new TranslationKeyStore();

    store.addLanguageNamespace('en', 'test', { test: 'test' });

    const result = store.getTranslationValue('test.test', 'de', 'en');

    expect(result).toBeDefined();
    expect(result!()).toBe('test');
  });

  it(`Should return undefined if the key is not found in any store`, () => {
    const store = new TranslationKeyStore();

    const result = store.getTranslationValue('test.test', 'de', 'en');

    expect(result).toBeUndefined();
  });
});
