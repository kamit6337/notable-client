export const sortOptionsList = [
  {
    id: 1,
    name: "Title",
    active: true,
  },
  {
    id: 2,
    name: "Date Updated",
  },
  {
    id: 3,
    name: "Date Created",
  },
];

export const sortFunction = (list, id) => {
  if (!list) return;

  const myList = [...list];

  if (id == 1) {
    return sortString(myList);
  }

  if (id == 2) {
    return sortByDate("updatedAt", myList);
  }

  if (id == 3) {
    return sortByDate("createdAt", myList);
  }
};

export const sortString = (list, bool = true) => {
  const myList = [...list];

  if (bool) {
    myList.sort((a, b) =>
      a.title.toUpperCase().localeCompare(b.title.toUpperCase())
    );
    return myList;
  }

  myList.sort((a, b) =>
    b.title.toUpperCase().localeCompare(a.title.toUpperCase())
  );
  return myList;
};

export const sortByDate = (variable, list, bool = true) => {
  const myList = [...list];
  console.log("my list", myList);
  if (bool) {
    // descending order of time means latest date come first
    myList.sort((a, b) => new Date(b[variable]) - new Date(a[variable]));
    console.log("sorted my list", myList);

    return myList;
  }

  // ascending order of time means old date come first
  myList.sort((a, b) => new Date(a[variable]) - new Date(b[variable]));

  return myList;
};
