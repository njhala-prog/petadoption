import { useCart } from "../../Context/Contextpet";
import { CartEmpty } from "./components/CartEmpty";
import { List } from "./components/List";

export const PetPage = () => {
    const { petList } = useCart();

    return (
        <main>
            {petList.length === 0 ? <CartEmpty /> : <List />}
        </main>
    );
};