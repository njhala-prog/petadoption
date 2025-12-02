import React, { createContext, useContext, useReducer } from "react";
import { Petreducer } from "../Reducers/Petreducer";

const initialPet = {
    petList: [],
};

const Contextpet = createContext(initialPet);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Petreducer, initialPet);

    function addToCart(pet) {
        const updatedPetList = state.petList.concat(pet);
        dispatch({
            type: "ADD_TO_CART",
            payload: { pets: updatedPetList }
        });
    }

    function removeFromCart(petId) {
        const updatedPetList = state.petList.filter(pet => pet.id !== petId);
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: { pets: updatedPetList }
        });
    }

    function clearCart() {
        dispatch({
            type: "CLEAR",
            payload: { pets: [] }
        });
    }

    const value = {
        petList: state.petList,
        addToCart,
        removeFromCart,
        clearCart
    };

    return (
        <Contextpet.Provider value={value}>{children}</Contextpet.Provider>
    );
};

export const useCart = () => {
    const context = useContext(Contextpet);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
