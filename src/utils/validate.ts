import ValidationError from "../domain/errors/validation-error";

export function checkNotNull(props: any) {
  if (!Object.keys(props).length)
    throw new ValidationError("props", "can't be empty");
  for (let key in props) {
    if (props[key] == undefined)
      throw new ValidationError(key, "is not defined");
  }
}

export function checkText(
  minLength: number,
  maxLength: number,
  ...text: string[]
) {
  text.forEach((value) => {
    if (value.length < minLength)
      throw new ValidationError(
        "Text",
        `must be greater than or equal to ${minLength} characters`
      );
    if (value.length > maxLength)
      throw new ValidationError(
        "Text",
        `must be less than or equal to ${maxLength} characters`
      );
  });
}

export function checkEmail(text: string) {
  const emailRegex = /^[\d\w_\-.]+@[\d\w\-_]+(\.[\d\w_]+)*$/;

  if (!emailRegex.test(text))
    throw new ValidationError("email", "wrong email format");
}
