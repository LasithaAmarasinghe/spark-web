declare global {
  interface String {
    // Converts the string to PascalCase
    toPascalCase(): string;
    // Converts the string to kebab-case
    toKebabCase(): string;
    // Capitalizes the first character of the string
    capitalizeFirst(): string;
    // Converts the string to snake_case
    toSnakeCase(): string;
  }
}

// Converts the string to PascalCase
String.prototype.toPascalCase = function (): string {
  return this.replace(/\w+/g, (word) => {
    // Capitalize the first letter and lowercase the rest of the word
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    // Remove spaces
  }).replace(/\s+/g, '');
};

// Converts the string to kebab-case
String.prototype.toKebabCase = function (): string {
  return (
    this.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
    )
      // Convert all words to lowercase
      ?.map((word) => word.toLowerCase())
      // Join words with hyphen
      .join('-') || ''
  );
};

// Capitalizes the first character of the string
String.prototype.capitalizeFirst = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

// Converts the string to snake_case
String.prototype.toSnakeCase = function (): string {
  return (
    this.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
    )
      // Convert all words to lowercase
      ?.map((word) => word.toLowerCase())
      // Join words with underscore
      .join('_') || ''
  );
};

// Exports all the functions
export {};
