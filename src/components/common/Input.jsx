const Input = ({ label, className = "", ...props }) => {
    return (
      <div className="flex flex-col">
        {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
        <input
          className={`rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
          {...props}
        />
      </div>
    )
  }
  
  export default Input