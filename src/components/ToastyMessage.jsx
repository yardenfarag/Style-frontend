import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export const ToastyMessage = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
        />
  )
}
