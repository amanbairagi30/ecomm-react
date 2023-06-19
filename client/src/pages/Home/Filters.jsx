import React from 'react'
import Divider from '../../components/Divider'


const categories = [
    {
        name: "Electronics",
        value: "electronics",
    },
    {
        name: "Home",
        value: "home",
    },
    {
        name: "Fashion",
        value: "fashion",
    },
    {
        name: "Sports",
        value: "sports",
    },
    {
        name: "Academics",
        value: "academics",
    },
]

const ages = [
    {
        name: "0-1 years old",
        value: "0-1",
    },
    {
        name: "1-2 years old",
        value: "1-2",
    },
    {
        name: "2-3 years old",
        value: "2-3",
    },
    {
        name: "3+ years old",
        value: "3-6",
    },
]

const Filters = ({
    showFilters,
    setShowFilters,
    filters,
    setFilters,
}) => {
    return (
        <div >
            <div className='md:w-80 w-40 '>
                <div className="flex justify-between">
                    <span className='text-xl'>Filters</span>
                    <i className="ri-close-line text-3xl cursor-pointer"
                        onClick={() => setShowFilters(!filters)}
                    ></i>
                </div>

                <Divider />

                <div className="flex flex-col gap-1 mt-5">
                    <span className="text-base text-gray-600">Categories</span>

                    {/* categories filters */}
                    <div className="flex flex-col gap-1">
                        {categories.map((category) => {
                            return (
                                <div className="flex items-center gap-2">
                                    <input type='checkbox'
                                        name="category"
                                        checked={filters.category.includes(category.value)}
                                        className='max-width'
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilters({ ...filters, category: [...filters.category, category.value] });
                                            } else {
                                                setFilters({
                                                    ...filters, category: filters.category.filter(
                                                        (item) => item !== category.value
                                                    ),
                                                });
                                            }
                                        }}
                                    />

                                    <label htmlFor='category'>{category.name}</label>
                                </div>
                            )
                        })}
                    </div>


                    {/* ages filters */}

                    <span className="text-base text-gray-600 mt-6">Ages</span>


                    <div className="flex flex-col gap-1">
                        {ages.map((age) => {
                            return (
                                <div className="flex items-center gap-2">
                                    <input type='checkbox'
                                        name="category"
                                        checked={filters.age.includes(age.value)}
                                        className='max-width'
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFilters({ ...filters, age: [...filters.age, age.value] });
                                            } else {
                                                setFilters({
                                                    ...filters, age: filters.age.filter(
                                                        (item) => item !== age.value
                                                    ),
                                                });
                                            }
                                        }}
                                    />

                                    <label htmlFor='age'>{age.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Filters
