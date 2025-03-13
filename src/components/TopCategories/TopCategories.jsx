import { useState, useEffect } from "react"
import { getCategories } from "../../services/categoryService"
import Category from "./Category"
import { Link } from "react-router-dom"

const TopCategories = ({ title }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
        <Link
          to="/White-page"
          className="text-sm sm:text-base font-semibold text-black hover:text-gray-500 transition-colors"
        >
          See All
        </Link>
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto pb-4 scrollbar-hide">
          <div className="w-full flex justify-between space-x-4 sm:space-x-6 md:space-x-8">
            {categories &&
              categories.slice(0, 10).map((item, index) => <Category key={index} icon={item.icon} name={item.name} />)}
          </div>
        </div>
        {/* <div className="absolute top-0 bottom-4 right-0 w-24 bg-gradient-to-l from-white pointer-events-none"></div> */}
      </div>
    </div>
  )
}

export default TopCategories