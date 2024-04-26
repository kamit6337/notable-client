/* eslint-disable react/prop-types */
import startsWithNumber from "../../utils/javaScript/startsWithNumber";
import TagListPage from "./TagListPage";

const ShowAlphabeticalTags = ({ letter, tags, reset }) => {
  if (!isNaN(letter)) {
    const tagList = tags.filter((tag) => startsWithNumber(tag.title));

    if (tagList.length === 0) return;

    return (
      <main className="flex flex-col gap-2">
        <p className="uppercase border-b border-gray-300 w-full pl-8">0-9</p>
        <div className="">
          <TagListPage reset={reset} tags={tagList} />
        </div>
      </main>
    );
  }

  const tagList = tags.filter((tag) =>
    tag.title.toLowerCase().startsWith(letter)
  );

  if (tagList.length === 0) return;

  return (
    <main className="flex flex-col gap-2">
      <p className="uppercase border-b border-gray-300 w-full pl-8">{letter}</p>
      <div className="">
        <TagListPage reset={reset} tags={tagList} />
      </div>
    </main>
  );
};

export default ShowAlphabeticalTags;
