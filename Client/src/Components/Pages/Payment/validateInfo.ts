import popUpAlert from "../../../Helpers/popUpAlert";
import { payAction } from "../../../Redux/AsyncActions/authActions";
import { IPaymentPayload } from "../../../Helpers/interfaces";

export const months = [
  { month: "Jan", value: "01" },
  { month: "Feb", value: "02" },
  { month: "Mar", value: "03" },
  { month: "Apr", value: "04" },
  { month: "May", value: "05" },
  { month: "Jun", value: "06" },
  { month: "Jul", value: "07" },
  { month: "Aug", value: "08" },
  { month: "Sep", value: "09" },
  { month: "Oct", value: "10" },
  { month: "Nov", value: "11" },
  { month: "Dec", value: "12" },
];
export const years = [
  { year: "2023", value: "23" },
  { year: "2024", value: "24" },
  { year: "2025", value: "25" },
  { year: "2026", value: "26" },
  { year: "2027", value: "27" },
  { year: "2028", value: "28" },
];

export default function validateInfo(props: IPaymentPayload) {
  const { number, name, expiryMonth, expiryYear, cvc } = props;
  let fullExpiry = expiryMonth.concat(expiryYear);
  // payment form values validator.
  if (
    cvc.length === 3 &&
    number.length > 12 &&
    fullExpiry.length === 4 &&
    name.length > 3
  ) {
    // of course more validations could be applied...
    // but i'm counting on the form input validators + JOI in backend
    payAction({ number, name, fullExpiry, cvc });
  } else {
    popUpAlert({
      title: "Your credentials are incorrect. Plesae try again.",
      icon: "error",
    });
  }
}
