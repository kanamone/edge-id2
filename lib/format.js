function createFormat(n, o, s) {
  const t = n.split("").map((r) => {
    return {
      characters: o[r] || r
    };
  });
  if (!s)
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