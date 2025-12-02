export const Petreducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "ADD_TO_CART":
        case "REMOVE_FROM_CART":
        case "CLEAR":
            return { ...state, petList: payload.pets };

        default:
            throw new Error("Action type not found");
    }
};
