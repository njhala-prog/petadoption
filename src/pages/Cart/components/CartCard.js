import { Link } from "react-router-dom";
import { useCart } from "../../../Context/Contextpet";

export const CartCard = ({ pet }) => {
    const { removeFromCart } = useCart();

    return (
        <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5">
            <div className="flex">
                <Link to={`${pet.id}`}>
                    <img className="w-32 rounded" src={pet.imageUrl} alt={pet.name} />
                </Link>
                <div>
                    <Link to={`${pet.id}`}>
                        <p className="text-lg ml-2 ">{pet.name}</p>
                    </Link>
                    <button
                        onClick={() => removeFromCart(pet.id)}
                        className="text-base ml-2 text-red-400">
                        Remove
                    </button>
                </div>
            </div>
            <div className="text-lg m-2 ">
                <span>{pet.description}</span>
            </div>
        </div>
    );
};
