import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const SearchResult = ({ keyword }) => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Fetch function
    const getData = async () => {
      const url = `https://api.mediehuset.net/stringsonline/search/${keyword}`;
      const result = await axios.get(url);
      setApiData(result.data.items);
    };
    getData();
  }, [keyword]);

  // Data filter function
  const data = useMemo(() => {
    if (!apiData) {
      return [];
    }
    if (keyword) {
      // Filtrering ud fra søgeresultat
      return apiData.filter(
        (elm) =>
          elm.title.toLowerCase().includes(keyword.toLowerCase()) ||
          elm.name.toLowerCase().includes(keyword.toLowerCase())
      );
    } else {
      // Random sortering og slice
      return apiData
        .sort(function (a, b) {
          return 0.5 - Math.random();
        })
        .slice(0, 10);
    }
  }, [apiData, keyword]);

  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id} href={`/${item.slug}`}>
            {item.title} - {item.name}
          </div>
        );
      })}
    </div>	
  );
};

export { SearchResult };
