const alphabetToColor: { [key: string]: string } = {
  a: "#f56a00",
  b: "#7265e6",
  c: "#ffbf00",
  d: "#00a2ae",
  e: "#f56a00",
  f: "#7265e6",
  g: "#ffbf00",
  h: "#00a2ae",
  i: "#f56a00",
  j: "#7265e6",
  k: "#ffbf00",
  l: "#00a2ae",
  m: "#f56a00",
  n: "#7265e6",
  o: "#ffbf00",
  p: "#00a2ae",
  q: "#f56a00",
  r: "#7265e6",
  s: "#ffbf00",
  t: "#00a2ae",
  u: "#f56a00",
  v: "#7265e6",
  w: "#ffbf00",
  x: "#00a2ae",
  y: "#f56a00",
  z: "#7265e6",
};

const rolesToColor: { [key: string]: string } = {
  ADMIN: "red",
  Admin: "red",
  FARM_MANAGER: "green",
  "Farm Manager": "green",
  AGRINOMIST: "blue",
  Agronomist: "blue",
  VIEWER: "purple",
  Viewer: "purple",
};

export const roles = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Owner",
    value: "OWNER",
  },
  {
    label: "Farm Manager",
    value: "FARM_MANAGER",
  },
  {
    label: "Agronomist",
    value: "ARGONOMIST",
  },
  {
    label: "Viewer",
    value: "VIEWER",
  },
];

export const getRoleColor = (role: string): string => {
  return rolesToColor[role] || "blue";
};

export const getAlphabetColor = (alphabet: string): string => {
  return alphabetToColor[alphabet.toLowerCase()] || "blue";
};
