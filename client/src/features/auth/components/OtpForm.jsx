import { useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
// Queries
import { useEmailVerify } from "../hooks/useEmailVerify";
// Constants
import APP_ROUTES from "@/constants/app.routes";


export const OtpForm = () => {

  const inputRef = useRef([]);
  const navigate = useNavigate();

  const { mutate: verifyEmail, isPending: isEmailVerifyPending } = useEmailVerify({
    onSuccess: (res) => {
      navigate(APP_ROUTES.HOME)
      toast.success(res.data.message);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to Verify Email"
      )
    }
  });



  const handleInputFocusForward = (event, index) => {
    // 1. Check if the input field must contain a value & we are at the second last input position by checking inputRef Array so that the do not cross the last input box
    // 2. After the condition is passed we move the focus to the next input field
    if (event.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleInputFocusBackword = (event, index) => {
    // !. Check the pressed key + We are not at the first Input box + If the inpute has value then clear it then second press moves backword // if the input is empty first press will move the focus to back
    // 1. If the condition is field then move the focus backword
    if (event.key === 'Backspace' && index > 0 && event.target.value === '') {
      inputRef.current[index - 1].focus();
    }
  }

  const handleInputPaste = (event) => {
    //1. Add onPaste handler to the input
    //2. Get Pasted text and split into characters
    //3. Check if the user has selected any input box or not by current[index]
    //4. Loop through character and fill the current[] Array
    //5. Focus the Last filled box (or next empty one)
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').slice(0, 6) // if user gives more that 6 character

    pastedData.split('').forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char; // value property or <input/>
      }
    });

    // Focus the last Field box or the first empty box
    // 1. array index is between 0 - 5 (6 boxes)
    // 2. so we need to bound focus index between no of char - 5 by min value so even the user give more than 6 character it handles it
    // so if pasted 6 chars >> Array index 5 (not 6)
    // And the focus index will be ArrayIndex+1 > exm pastedTxt = 3 arrayInde = 3 which is equals to 4th input field
    const focusIndex = Math.min(pastedData.length, 5);
    inputRef.current[focusIndex].focus();


  }

  const handleInputSubmit = (event) => {
    event.preventDefault();
    const valueArray = inputRef.current.map((element) => {
      return element.value
    });
    const value = valueArray.join('');
    verifyEmail({ otp: value }) // Server expects a otp key in body object

  };


  return (
    <div className="border border-zinc-700 max-w-sm rounded-lg text-zinc-200 p-4 space-y-4">
      <h1 className="text">Enter OTP</h1>
      <form className="grid grid-cols-6 space-x-2">
        {Array(6).fill(0).map((_, index) => {
          return <input key={index}
            maxLength={1}
            required
            type="text"
            className="p-1 text-center border border-zinc-600 rounded-lg text-4xl"
            ref={e => inputRef.current[index] = e} // Read the expl down
            onChange={(event) => handleInputFocusForward(event, index)} // Reach 2nd expl down
            onKeyDown={(event) => handleInputFocusBackword(event, index)}
            onPaste={(event) => handleInputPaste(event)}
          />
        })}
      </form>
      <button
        className={`w-full px-4 py-2 ${isEmailVerifyPending ? 'bg-blue-700' : 'bg-blue-600'} text-white rounded-md  active:bg-blue-700`}
        onClick={(event) => handleInputSubmit(event)}
      >
        Verify
      </button>
    </div>
  )
}

// The useRef([]) creates a empty array in innitial 
// And we store the ref object to the inputRef;
// We need a way to store each <input/> element to their respected index of that array inside the inpurRef;
// The ref={} excepts two things either a `CallBack Fucntion` OR `The refObject (inputRef)` created by useRef();
// Here we have utilized the callback method 
// the functions receives the DOM element (here <input/>) to its parameter (e)
// We have used the `map` method's index to put the inputRef.current[index] to store each input to its respected index position in array
// Now we can refrence each input by just this syntac useRef.current[0] >> the first <input/>
// That's it !!


// in plain vanilla JavaScript, `input` fires every time the text changes, 
// and `change` only fires when the element losses focus
// React's team realized this was inconsistent with how developers actually want to use forms, so the fixed it.
// React's `onChange`: fires immediately on every keystroke. it is a synthetic event that wraps the browser's navtive `input` event.
// React's `onInput`: it is identical to the onChange it does the same job but it is rearly used

