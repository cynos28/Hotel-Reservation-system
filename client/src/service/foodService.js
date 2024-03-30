import { sample_foods, sample_tags } from "../fooddata"

export const getAll = async () => sample_foods;

// search function
export const search = async searchTerm =>
    sample_foods.filter(item =>
        item.F_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

//tags 

    export const getAllTags = async () => sample_tags;

    export const getAllByTag = async tag =>{
        if (tag === 'All') return getAll();
        return sample_foods.filter(item => item.F_tags?.includes(tag));
    }; 