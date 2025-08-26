// Простой namespaced-логгер, чтобы не было каши в консоли
export const makeLog = (ns, color = "#6c8cff") => {
  const tag = `%c[${ns}]`;
  const style = `color:${color};font-weight:600`;
  return {
    group(label, data) { console.groupCollapsed(tag + " " + label, style); if (data !== undefined) console.log(data); },
    end() { console.groupEnd(); },
    info(label, data) { console.log(tag + " " + label, style, data ?? ""); },
    warn(label, data) { console.warn(tag + " " + label, style, data ?? ""); },
    error(label, data) { console.error(tag + " " + label, style, data ?? ""); },
    table(label, rows) { console.groupCollapsed(tag + " " + label, style); console.table(rows); console.groupEnd(); },
  };
};
