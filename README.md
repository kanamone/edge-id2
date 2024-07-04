# edge-id2

## dist/define.js
```js
function defineID(a) {
  const o = [];
  for (let r = 0;r < a.format.length; r++) {
    const e = a.format[r], t = e.characters.split(""), i = e.repeats || 1;
    for (let n = 0;n < i; n++)
      o.push(t);
  }
  const l = a.format.map((r) => {
    return r.characters.length ** (r.repeats || 1);
  }).reduce((r, e) => r * e, 1), s = [];
  for (let r = 0;r < o.length; r++)
    s.push(o.slice(r).reduce((e, t) => e * t.length, 1));
  return { n: l, stringify: (r) => {
    if (r < 0)
      throw new Error("negative number is not acceptable.");
    if (l < r + 1)
      throw new Error(`number of ids exceeded. number of available ids = ${l}`);
    let e = "";
    for (let t = 0;t < s.length; t++) {
      const i = s[t], n = Math.floor(r % i / (s[t + 1] || 1));
      e += o[t][n];
    }
    return e;
  }, parse: (r) => {
    if (r.length !== o.length)
      throw new Error("invalid id length.");
    let e;
    const t = r.split("").map((n, c) => {
      const f = o[c], h = f.indexOf(n);
      if (h < 0)
        e = new Error(`invalid id. '${n}' (index = ${c}) is not acceptable in [${f.join(", ")}].`);
      return h * (s[c + 1] || 1);
    });
    if (e)
      throw e;
    let i = 0;
    for (let n = 0;n < t.length; n++)
      i += t[n];
    return i;
  } };
}
```

## dist/format.js
```js
function createFormat(n, c, o) {
  const t = n.split("").map((r) => {
    return {
      characters: c[r] || r
    };
  });
  if (!o)
    return t;
  return t.reduceRight((r, e) => {
    const a = r[0];
    if (r.length > 0 && a.characters === e.characters)
      return r[0] = Object.assign({}, e, {
        repeats: (e.repeats || 1) + (a.repeats || 1)
      }), r;
    return r.unshift(e), r;
  }, []);
}
```