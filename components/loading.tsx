export const Loading=()=>{
    return(
        <div className="flex justify-center items-center">
                        <svg
                            className="animate-spin h-20 w-20 text-blue-600" // Tailwind pour le spinner
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            role="status"
                        >
                            <path
                                d="M4 12a8 8 0 1 1 8 8v-2a6 6 0 1 0-6-6H4z"
                                className="text-gray-200"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                d="M12 4V2M12 22v-2M22 12h-2M4 12H2"
                                className="text-gray-600"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
    )
}