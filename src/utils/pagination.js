export const dividirEnPaginas = (texto, palabrasPorPagina = 300) => {
  const palabras = texto.split(" ");
  const paginas = [];

  for (let i = 0; i < palabras.length; i += palabrasPorPagina) {
    paginas.push(palabras.slice(i, i + palabrasPorPagina).join(" "));
  }

  return paginas;
};