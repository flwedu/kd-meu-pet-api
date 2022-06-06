export function checkNotNull(props: any) {
  if (!Object.keys(props).length) throw new Error("props cannot be empty");
  for (let key in props) {
    if (props[key] == undefined) throw new Error(`${key} is not defined`);
  }
}

export function checkText(
  minLength: number,
  maxLength: number,
  ...text: string[]
) {
  text.forEach((value) => {
    if (value.length < minLength)
      throw new Error(
        `Text must be greater than or equal to ${minLength} characters`
      );
    if (value.length > maxLength)
      throw new Error(
        `Text must be less than or equal to ${maxLength} characters`
      );
  });
}

export function checkEmail(text: string) {
  const emailRegex = /^[\d\w_\-.]+@[\d\w\-_]+(\.[\d\w_]+)*$/;

  if (!emailRegex.test(text)) throw new Error("Error validating email");
}
