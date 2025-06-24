export const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
                <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
            </div>
            <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Chargement...</p>
                <p className="text-xs text-gray-500">Veuillez patienter</p>
            </div>
        </div>
    );
};