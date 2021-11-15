export default function handleGetData(prop, data) {
  if (!prop) return undefined;
  if (typeof prop === 'function') {
    return prop(data ? data.current : null);
  } else {
    return !!prop.current ? prop.current : prop;
  }
}