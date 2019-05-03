// this is API simulation

const heroes = {
  0: {
    id: 0,
    name: "Iron Man",
    source: {
      uri:
        "https://i.pinimg.com/originals/a8/97/55/a89755fd60d2f8800942ab6cd00edff3.jpg"
    }
  },
  1: {
    id: 1,
    name: "Black Widow",
    source: {
      uri:
        "https://ksassets.timeincuk.net/wp/uploads/sites/55/2018/02/Black-Widow-Avengers-920x584.jpg"
    }
  },
  2: {
    id: 2,
    name: "Thanos",
    source: {
      uri:
        "https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/5/52/Empire_March_Cover_IW_6_Textless.png"
    }
  }
};

export const fetchHero = (id = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(heroes[id]);
    }, 1000);
  });
};

export const fetchHeroes = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(heroes);
    }, 1000);
  });
};
