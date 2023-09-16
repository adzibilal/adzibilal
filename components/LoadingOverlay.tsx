export default function LoadingOverlay(){
    return (
        <div className="fixed w-screen h-screen bg-black-primary/40 flex items-center justify-center top-0 left-0 z-50">
            <span className="loading loading-ring loading-lg scale-150"></span>
        </div>
    )
}