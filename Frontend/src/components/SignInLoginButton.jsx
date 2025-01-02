
const CommonBtn = ({btnName,clickEvent})=>{
    return(
        <button
        onClick={clickEvent}
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {btnName}
      </button>
    )
}

export default CommonBtn