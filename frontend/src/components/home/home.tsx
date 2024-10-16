import { useDispatch, useSelector } from "react-redux";
import { addUrlAndValidate, selectError, selectUrl } from "./home-slice";
import Link from "../../assets/icons/link";
import Input from "../ui/input/input";
import AddLink from "../../assets/icons/add-link";
import { addGood } from "../../lib/actions/addGood";

const HomePage = () => {
  const dispatch = useDispatch();
  const url = useSelector(selectUrl);
  const error = useSelector(selectError);

  const handleInput = (link: string) => {
    dispatch(addUrlAndValidate(link));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Input
        startIcon={<Link />}
        placeholder="вставьте ссылку сюда"
        width={"760px"}
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        value={url}
        endIcon={!error && url ? <AddLink /> : null}
        error={error}
        handleLinkAdd={() => addGood(url)}
      />
    </div>
  );
};

export default HomePage;
