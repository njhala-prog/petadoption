import React from 'react'
import { useCart } from '../../../Context/Contextpet';
import { CartCard } from './CartCard';
import { useNavigate } from 'react-router-dom';

export const List = () => {

    const { petList } = useCart();
    const navigate = useNavigate();

    function handlelength() {
        if (petList.length > 1) {
            alert("please add only pet at a time");
            navigate("/")

        }
        else {
            navigate("/Questions")
        }

    }
    return (
        <>
            <section>
                <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
                    My Cart {petList.length}
                </p>
            </section>

            <section>
                {petList.map((pet) => (
                    <CartCard key={pet.id} pet={pet} />
                ))}
            </section>

            <section className="max-w-4xl m-auto">

                <div className="text-center my-5 ">
                    <button onClick={handlelength} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                        Procced For Application  <i className="ml-2 bi bi-arrow-right"></i>
                    </button>
                </div>
            </section>

        </>
    )

}


