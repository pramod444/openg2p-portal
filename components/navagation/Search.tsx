import React from 'react'

function Search() {
    return (
        <form className="w-3/4 " >
            <label htmlFor="default-search" className="mb-2 w-full text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-3 h-12 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full  p-2 pl-10 text-sm text-black-600 border border-gray-300 rounded-lg bg-white-200 focus:ring-gray-500 focus:border-gray-500 dark:bg-white-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black-800 dark:focus:ring-gray-500 dark:focus:border-gray-500 outline-none" placeholder="Search" />
                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-gray-700 rounded-r-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                    Search
                </button>
            </div>
        </form>
    )
}

export default Search;