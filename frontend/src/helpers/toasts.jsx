import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const toastSuccess = (message) => {
    MySwal.fire({
    title: <p>{message}</p>,
    color: '#000',
    icon: 'success',
    iconColor: '#17962a',
    background: '#fff',
    showConfirmButton: false,
    toast: true,
    timer: '2000',
    timerProgressBar: true,
    position: 'bottom-end',
  })
}

const alertError = (message) => {
  MySwal.fire({
    title: <p>{message}</p>,
    color: '#fff',
    icon: 'error',
    iconColor: '#ff0000',
    background: '#00040fb7',
    buttonsStyling: false,
    customClass: {
        confirmButton: 'bg-[#ff0000] py-2 px-4 outline-0 rounded-[5px] font-poppins font-semibold'
    },
  })
}

export {
    toastSuccess,
    alertError
}