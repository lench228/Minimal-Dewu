import Link from "../../assets/icons/link";
import { UseLocalStorage } from "../../utils/useLocalStorage";
import Input from "../ui/input/input";
import AddLink from "../../assets/icons/search";

const HomePage = () => {
  const [search, SetSearch] = UseLocalStorage("url", "");
  const [error, setError] = UseLocalStorage("error", "");

  const handleInput = (link: string) => {
    const regex = "https://www.dewu.com/product-detail";
    SetSearch(link);
    if (!link || link.startsWith(regex)) {
      setError("");
    } else {
      setError("Неверная ссылка");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Input
        startIcon={<Link></Link>}
        placeholder="вставьте ссылку сюда"
        width={"760px"}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        value={search}
        endIcon={!error && search ? <AddLink></AddLink> : null}
        error={error}
      ></Input>
    </div>
  );
};

export default HomePage;
