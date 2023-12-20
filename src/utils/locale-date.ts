export function localeDate(input: string | number | Date, locale = "en-US") {
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    return input;
  } else {
    return new Date(input).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
