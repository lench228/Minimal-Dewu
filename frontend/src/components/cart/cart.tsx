import Link from "../../assets/icons/link";
import AddLink from "../../assets/icons/search";
import { UseLocalStorage } from "../../utils/useLocalStorage";
import Input from "../ui/input/input";

const Cart = () => {
  const [search, SetSearch] = UseLocalStorage("url", "");
  const [error, setError] = UseLocalStorage("error", "");

  const handleInput = (link: string) => {
    const regex = "https://www.dewu.com/product-detail";
    SetSearch(link);
    if (link.startsWith(regex)) {
      setError("");
    } else {
      setError("Неверная ссылка");
    }
  };

  return (
    <div className="w-full flex gap-10 items-center justify-center h-full">
      <Input
        startIcon={<Link></Link>}
        placeholder="вставьте ссылку сюда"
        width={"600px"}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        value={search}
        endIcon={!error ? <AddLink></AddLink> : null}
        error={error}
      />
      <aside>
        <div className="text-9xl">cart</div>
      </aside>
    </div>
  );
};

export default Cart;
