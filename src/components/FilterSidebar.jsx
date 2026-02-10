import { useForm } from 'react-hook-form';

const FilterSidebar = ({onFilter}) => {
    const defaultValues = {
        search: "",
        category: [],
        promo: []
    }

    const { register, handleSubmit, reset } = useForm({
      defaultValues
    })

    function handleFilter(values) {
        // normalisasi supaya selalu array
        const normalized = {
            ...values,
            category: Array.isArray(values.category) ? values.category : (values.category ? [values.category] : []),
            promo: Array.isArray(values.promo) ? values.promo : (values.promo ? [values.promo] : [])
        };

        if (typeof onFilter === 'function') {
            onFilter(normalized)
        }
    }

    function handleReset() {
        reset({...defaultValues});
        if (typeof onFilter === 'function') onFilter({...defaultValues});
    }


    return (
        <form onSubmit={handleSubmit(handleFilter)}
              className="bg-black text-white p-6 rounded-xl h-fit w-full lg:w-72 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Filter</h3>
                <button type="button" onClick={handleReset} className="text-xs text-gray-400 hover:text-white cursor-pointer">Reset Filter</button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <label className="block text-sm font-bold mb-2">Search</label>
                <input
                    type="text"
                    placeholder="Search Your Product"
                    className="w-full bg-white text-sm text-gray-600 px-4 py-3 rounded-lg focus:outline-none"
                    {...register("search")}
                />
            </div>

            {/* Category */}
            <div className="mb-6">
                <h4 className="font-bold mb-3">Category</h4>
                <div className="space-y-3 text-sm text-gray-300">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register('category')} value={'Favourite Product'} id={'favProduct'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>Favourite Product</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register('category')} value={'Coffee'} id={'coffee'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>Coffee</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register('category')} value={'Non-Coffee'} id={'nonCoffee'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>Non-Coffee</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register('category')} value={'Foods'} id={'foods'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>Foods</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register('category')} value={'Add-On'} id={'addOn'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>Add-On</span>
                    </label>
                </div>
            </div>

            {/* Sort By */}
            <div className="mb-6">
                <h4 className="font-bold mb-3">Sort By</h4>
                <div className="space-y-3 text-sm text-gray-300">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register("promo")} value={'Buy 1 get 1'} id={'buyOneGetOne'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>Buy 1 get 1</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register("promo")} value={'Flash Sale'} id={'flashSale'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>Flash Sale</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register("promo")} value={'Birthday Package'} id={'birthDay'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>BirthDay Package</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-white">
                        <input type="checkbox" {...register("promo")} value={'Cheap'} id={'Cheap'} className="accent-orange-500 w-4 h-4 rounded"/>
                        <span>Cheap</span>
                    </label>
                </div>
            </div>

            {/* Range Price (Visual Simulation) */}
            <div className="mb-8">
                <h4 className="font-bold mb-3">Range Price</h4>
                <div className="relative w-full h-1 bg-gray-600 rounded mt-4">
                    <div className="absolute left-0 top-0 h-full bg-orange-500 w-2/3"></div>
                    <div
                        className="absolute left-0 -top-1.5 w-4 h-4 bg-white rounded-full shadow cursor-pointer border-2 border-orange-500"></div>
                    <div
                        className="absolute left-2/3 -top-1.5 w-4 h-4 bg-white rounded-full shadow cursor-pointer border-2 border-orange-500"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-4">
                    <span>IDR 10k</span>
                    <span>IDR 100k</span>
                </div>
            </div>

            <button type={'submit'}
                className="w-full bg-orange-500 py-3 rounded-lg font-bold text-black hover:bg-orange-600 transition shadow-lg shadow-orange-500/30">
                Apply Filter
            </button>
        </form>
    );
    };

export default FilterSidebar;