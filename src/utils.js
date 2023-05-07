export const transform = (data) => {
    if (!data) {
        return data;
    }

    const { _id, ...rest } = data;

    return {
        id: _id,
        ...rest,
    };
};
