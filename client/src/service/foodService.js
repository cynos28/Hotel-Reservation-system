import { sample_foods } from "../fooddata"

export const getAll = async () => sample_foods;

// search function
export const search = async searchTerm =>
    sample_foods.filter(item =>
        item.F_name.toLowerCase().includes(searchTerm.toLowerCase())
        );