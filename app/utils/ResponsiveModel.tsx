'use client'

interface ResponsiveModelProps{
    children:React.ReactNode
}

const ResponsiveModel:React.FC<ResponsiveModelProps> = ({children}) => {
    return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {children}
        </div>
    );
};

export default ResponsiveModel;