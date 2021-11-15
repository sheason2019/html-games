
const initFallingBlock = (() => {
  const map = new Map();
  const I = [
    { row: 0, column: 3 },
    { row: 0, column: 4 },
    { row: 0, column: 5 },
    { row: 0, column: 6 },
  ];
  map.set("I", I);

  const O = [
    { row: 0, column: 4 },
    { row: -1, column: 4 },
    { row: 0, column: 5 },
    { row: -1, column: 5 },
  ];
  map.set("O", O);

  const J = [
    { row: 0, column: 3 },
    { row: 0, column: 4 },
    { row: 0, column: 5 },
    { row: -1, column: 3 },
  ];
  map.set("J", J);

  const L = [
    { row: 0, column: 3 },
    { row: 0, column: 4 },
    { row: 0, column: 5 },
    { row: -1, column: 5 },
  ]
  map.set("L", L);

  const S = [
    { row: 0, column: 3 },
    { row: 0, column: 4 },
    { row: -1, column: 4 },
    { row: -1, column: 5 },
  ];
  map.set("S", S);

  const T = [
    { row: 0, column: 3 },
    { row: 0, column: 4 },
    { row: 0, column: 5 },
    { row: -1, column: 4 },
  ];
  map.set("T", T);

  const Z = [
    { row: 0, column: 4 },
    { row: 0, column: 5 },
    { row: -1, column: 3 },
    { row: -1, column: 4 },
  ];
  map.set("Z", Z);


  return (key = "I") => ({
    shape: JSON.parse(JSON.stringify(map.get(key))),
    offset: { row: 0, col: 0 },
    key,
  });
})();
const initTransform = (() => {
  const map = new Map();
  const I = [
    [
      { row: 0, column: 3 },
      { row: 0, column: 4 },
      { row: 0, column: 5 },
      { row: 0, column: 6 },
    ],
    [
      { row: 0, column: 4 },
      { row: -1, column: 4 },
      { row: -2, column: 4 },
      { row: -3, column: 4 },
    ],
  ];
  map.set("I", I);

  const O = [
    [
      { row: 0, column: 4 },
      { row: -1, column: 4 },
      { row: 0, column: 5 },
      { row: -1, column: 5 },
    ]
  ];
  map.set("O", O);

  const J = [
    [
      { row: 0, column: 3 },
      { row: 0, column: 4 },
      { row: 0, column: 5 },
      { row: -1, column: 3 },
    ],
    [
      { row: 0, column: 4 },
      { row: -1, column: 4 },
      { row: -2, column: 4 },
      { row: -2, column: 5 },
    ],
    [
      { row: -1, column: 3 },
      { row: -1, column: 4 },
      { row: -1, column: 5 },
      { row: 0, column: 5 },
    ],
    [
      { row: 0, column: 5 },
      { row: -1, column: 5 },
      { row: -2, column: 5 },
      { row: 0, column: 4 },
    ]
  ]
  map.set("J", J);

  const L = [
    [
      { row: 0, column: 3 },
      { row: 0, column: 4 },
      { row: 0, column: 5 },
      { row: -1, column: 5 },
    ],
    [
      { row: 0, column: 4 },
      { row: 0, column: 5 },
      { row: -1, column: 4 },
      { row: -2, column: 4 },
    ],
    [
      { row: -1, column: 3 },
      { row: -1, column: 4 },
      { row: -1, column: 5 },
      { row: 0, column: 3 },
    ],
    [
      { row: 0, column: 5 },
      { row: -1, column: 5 },
      { row: -2, column: 5 },
      { row: -2, column: 4 },
    ]
  ]
  map.set("L", L);

  const S = [
    [
      { row: 0, column: 3 },
      { row: 0, column: 4 },
      { row: -1, column: 4 },
      { row: -1, column: 5 },
    ],
    [
      { row: 0, column: 5 },
      { row: -1, column: 5 },
      { row: -1, column: 4 },
      { row: -2, column: 4 },
    ],
  ];
  map.set("S", S);

  const T = [
    [
      { row: 0, column: 3 },
      { row: 0, column: 4 },
      { row: 0, column: 5 },
      { row: -1, column: 4 },
    ],
    [
      { row: -2, column: 4 },
      { row: -1, column: 4 },
      { row: 0, column: 4 },
      { row: -1, column: 5 },
    ],
    [
      { row: -1, column: 3 },
      { row: -1, column: 4 },
      { row: -1, column: 5 },
      { row: 0, column: 4 },
    ],
    [
      { row: -2, column: 4 },
      { row: -1, column: 4 },
      { row: 0, column: 4 },
      { row: -1, column: 3 },
    ],
  ];
  map.set("T", T);

  const Z = [
    [
      { row: 0, column: 4 },
      { row: 0, column: 5 },
      { row: -1, column: 3 },
      { row: -1, column: 4 },
    ],
    [
      { row: 0, column: 4 },
      { row: -1, column: 4 },
      { row: -1, column: 5 },
      { row: -2, column: 5 },
    ],    
  ];
  map.set("Z", Z);

  return (key = "I") => ({
    group: JSON.parse(JSON.stringify(map.get(key))),
    point: 0,
  });
})();

const registBlock = [
  "I",
  "O",
  "J",
  "L",
  "S",
  "T",
  "Z",
];

let nextKey = null;
const setNextKey = (key) => {
  nextKey = key;
};

let regenerateNextKey = null;
const setRegenerateNextKey = (func) => {
  regenerateNextKey = func;
}

const getKey = () => {
  if (nextKey !== null) {
    const next = nextKey;
    nextKey = null;
    if (regenerateNextKey !== null) {
      regenerateNextKey();
    }
    return next;
  }
  return registBlock[Math.floor(Math.random() * registBlock.length)];
};

export { initFallingBlock, initTransform, getKey, setNextKey, setRegenerateNextKey };
