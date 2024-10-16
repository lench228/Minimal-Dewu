import Link from "../../assets/icons/link";
import AddLink from "../../assets/icons/add-link";
import Input from "../ui/input/input";
import { useDispatch, useSelector } from "react-redux";
import { addUrlAndValidate, selectError, selectUrl } from "../home/home-slice";

const Cart = () => {
  const dispatch = useDispatch();

  const url = useSelector(selectUrl);
  const error = useSelector(selectError);

  const handleInput = (link: string) => {
    dispatch(addUrlAndValidate(link));
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
        value={url}
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
