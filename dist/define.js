function defineID(s) {
  const i = [];
  for (let r = 0;r < s.format.length; r++) {
    const t = s.format[r], n = t.characters.split(""), e = t.repeats || 1;
    for (let o = 0;o < e; o++)
      i.push(n);
  }
  const a = () => {
    return s.format.map((r) => {
      return r.characters.length ** (r.repeats || 1);
    }).reduce((r, t) => r * t, 1);
  }, c = i.map((r, t) => i.slice(t).reduce((n, e) => n * e.length, 1));
  return { n: a, stringify: (r) => {
    if (r < 0)
      throw new Error("negative number is not acceptable.");
    if (a() < r + 1)
      throw new Error(`number of ids exceeded. number of available ids = ${a()}`);
    return c.map((n, e) => Math.floor(Number(r % n / (c[e + 1] || 1)))).map((n, e) => i[e][n]).join("");
  }, parse: (r) => {
    if (r.length !== i.length)
      throw new Error("invalid id length.");
    let t;
    const n = r.split("").map((e, o) => {
      const f = i[o], m = f.indexOf(e);
      if (m < 0)
        t = new Error(`invalid id. '${e}' (index = ${o}) is not acceptable in [${f.join(", ")}].`);
      return m * (c[o + 1] || 1);
    });
    if (t)
      throw t;
    return n.reduce((e, o) => e + o, 0);
  } };
}