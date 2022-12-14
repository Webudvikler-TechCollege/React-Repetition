import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchResult } from "../../App/Search/SearchResult";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  function handleInput(e) {
    setKeyword(e.target.value);
  }

  return (
    <>
      <label htmlFor="keyword">Søgeord:</label>
      <input id="keyword" type="text" onKeyDown={handleInput} />
      <button>Søg</button>
      {keyword && <SearchResult keyword={keyword} />}
    </>
  );
};

export { Search, SearchResult };
