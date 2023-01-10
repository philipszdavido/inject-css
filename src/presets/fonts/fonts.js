const fonts = {
  Andika: {
    embed:
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""><link href="https://fonts.googleapis.com/css2?family=Andika&amp;display=swap" rel="stylesheet">',
    css: "* { font-family: 'Andika', sans-serif !important;}",
    name: "",
  },
  Rowdies: {
    embed:
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Rowdies:wght@300&display=swap" rel="stylesheet">',
    css: "* { font-family: 'Rowdies', cursive !important; }",
    name: "Font Weight: 300",
  },
  Rowdies_Regular: {
    embed:
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Rowdies&display=swap" rel="stylesheet">',
    css: "* { font-family: 'Rowdies', cursive !important; }",
  },
  Quicksand: {
    embed:
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet">',
    css: "* { font-family: 'Quicksand', sans-serif !important; }",
  },
  Josefin_Sans: {
    embed:
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">',
    css: "* { font-family: 'Josefin Sans', sans-serif !important; }",
  },
  Arvo: {
    embed:
      '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Arvo&display=swap" rel="stylesheet">',
    css: "* { font-family: 'Arvo', serif !important; }",
  },
};

const fontsToArray = () => {
  const keys = Object.keys(fonts);

  return keys.map((key) => {
    const name = parsekeyName(key);
    return {
      ...fonts[key],
      name: fonts[key].name ? name + ":  " + fonts[key].name : name,
    };
  });
};

const parsekeyName = (name) => {
  return name.split("_").join(" ");
};

export default fontsToArray();
