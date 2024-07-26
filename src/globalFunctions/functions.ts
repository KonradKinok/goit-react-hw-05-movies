"use strict";

/**
 *
 * @param {string} tagDivAndIdExampleTheory
 * @param {string} tagDivAndIdExamplePractice
 */
export function htmlTagViewExample(
  tagDivAndIdExampleTheory: string,
  tagDivAndIdExamplePractice: string,
  className: string = "example-theory-pre"
): void {
  const example_theory = document.querySelector(tagDivAndIdExampleTheory);
  const example_practice = document.querySelector(tagDivAndIdExamplePractice);

  if (example_theory && example_practice) {
    const phrase = document.createElement("pre");
    phrase.classList.add(className);
    const examplePracticeInnerHtml = example_practice.innerHTML.split("  ").join("");

    phrase.textContent = `HTML: ${examplePracticeInnerHtml}`;
    example_theory.prepend(phrase);
  }
}

/**
 * LocalStorage saveLocalStorage
 * @param {string} key
 * @param {object} value
 */
export const saveLocalStorage = (key: string, value: object): void => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error:any) {
    console.error("Set state error: ", error.message);
  }
};

/**
 * localStorage load
 * @param {string} key
 * @returns {object | undefined}
 */
export const loadLocalStorage = (key: string): object | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error:any) {
    console.error("Get state error: ", error.message);
    return undefined;
  }
};

/**
 * getRandomElement
 * @param {Array<any>} array
 * @returns {any}
 */
export function getRandomElement(array: Array<any>): any {
  // Generuj losowy indeks od 0 do array.length - 1
  const randomIndex = Math.floor(Math.random() * array.length);
  // Zwróć wybrany element
  return array[randomIndex];
}

/**
 * getRandomHexColor
 * @returns {string}
 */
export function getRandomHexColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

/**
 * getRandomColorRgba
 * @returns {string}
 */
export function getRandomColorRgba(): string {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = 0.2 + Math.random() * 0.3;
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
}

/**
 * capitalizeFirstLetter
 * @param {string} str
 * @returns {string}
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
