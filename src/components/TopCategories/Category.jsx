import { Link } from "react-router-dom"

const Category = ({ icon, name }) => {
  return (
    <Link to="/White-page" className="flex-shrink-0 group">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 lg:w-25 lg:h-25 sm:w-20 sm:h-20 flex justify-center items-center rounded-full bg-[#efefef] group-hover:bg-[#e5e5e5] transition-colors">
          <img src={icon || "/placeholder.svg"} alt={name} className="w-1/2 h-1/2 object-contain" />
        </div>
        <span className="mt-2 text-xs sm:text-sm text-center group-hover:text-gray-600 transition-colors whitespace-nowrap">
          {name}
        </span>
      </div>
    </Link>
  )
}

export default Category

