export function checkNotNull(props: any) {
  if (!Object.keys(props).length) throw new Error("props cannot be empty");
  for (let key in props) {
    if (props[key] == undefined) throw new Error(`${key} is not defined`);
  }
}
