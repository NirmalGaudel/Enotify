module.exports = (e) => {
  e = JSON.parse(JSON.stringify(e));
  //sanitize castErrors
  const errorKeys = e?.errors ? Object.keys(e.errors) : [];
  for (const key of errorKeys) {
    if (!e.errors[key]) continue;
    if (e.errors[key].name === "CastError") {
      e.errors[key] = {
        name: e.errors[key].name,
        kind: "invalid",
        message:
          e.errors[key].path +
          " type is " +
          e.errors[key].kind +
          " but got " +
          e.errors[key].valueType,
        value: e.errors[key].value,
      };
      if (key.includes(".")) delete e.errors[key.split(".")[0]];
    }
    delete e.errors[key].properties;
    delete e.errors[key].reason;
  }
  delete e._message;
  if (e.message && e.message.includes(":")) e.message = e.message.split(":")[0];
  return e;
};
