import Swal from "sweetalert2";
import { IAlert } from "./interfaces";

export default function popUpAlert(props: IAlert) {
  const { icon, title } = props;
  return Swal.fire({
    customClass: {
      container: "my-swal",
    },
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 2500,
  });
}
