export default function handleGetData(prop, data) {
  if (typeof prop === 'function') {
    return prop(data.current);
  } else {
    return !!prop.current ? prop.current : prop;
  }
}