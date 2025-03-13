const Button = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
    const sizeStyles = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    }
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
      ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-500",
    }
  
    return (
      <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
        {children}
      </button>
    )
  }
  
  export default Button