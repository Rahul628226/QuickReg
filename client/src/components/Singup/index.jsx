import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    district: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {

	const password = generateRandomPassword();
	setRandomPassword(password);
    setData({ ...data, [input.name]: input.value ,password});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set the random password to the 'password' field in the 'data' state

    try {
      const url = "http://localhost:8080/api/users";
	 
	  
	//   setData({ ...data, password });
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
	setData({
		firstName: "",
		district: "",
		email: "",
		phone: "",
		password: "",
	})
  };

  // ICT REG
  /*******************************************************************************************************************/

  // Define the 'districts' array with district names and their corresponding numeric values
  const districts = [
    { name: "Thiruvananthapuram", value: 1 },
    { name: "Kollam", value: 2 },
    { name: "Pathanamthitta", value: 3 },
    { name: "Alappuzha", value: 4 },
    { name: "Kottayam", value: 5 },
    { name: "Idukki", value: 6 },
    { name: "Ernakulam", value: 7 },
    { name: "Thrissur", value: 8 },
    { name: "Palakkad", value: 9 },
    { name: "Malappuram", value: 10 },
    { name: "Kozhikode", value: 11 },
    { name: "Wayanad", value: 12 },
    { name: "Kannur", value: 13 },
    { name: "Kasaragod", value: 14 },
  ];

  const [inpt, setinput] = useState({
    prereg_name: "",
    prereg_email: "",
    prereg_mob: "",
    districtd: "",
  });

  const navigate = useNavigate();

  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [otp, setOTP] = useState("");

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setinput((inpt) => ({ ...inpt, [name]: value }));
    console.log(inpt);
  };

  const [randomPassword, setRandomPassword] = useState(""); // State to hold the random password

  // Function to generate a random password
  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 10;
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleCloseDialog = () => {
    setShowOTPDialog(false);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    registerData();
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the server
    const otpData = {
      otp_received: otp,
      user_id: data.email,
      prereg_name: data.firstName,
      prereg_email: data.email,
      prereg_mob: data.phone,
      districtd: data.district,
    };

    // Send the OTP data to the server for verification
    axios
      .post(
        "https://dev.yip.kerala.gov.in/yipapp/index.php/Com_mobile_otp/checkotp",
        otpData
      )
      .then((response) => {
        const { validation, Success } = response.data;
        if (validation && Success === "0") {
          // OTP verification successful, show the success message in the dialog
          setShowOTPDialog(false); // Close the OTP verification dialog
          alert("Username and password successfully sent to your email.");
        } else {
          // OTP verification failed, show an error message in the dialog
        //   alert("Invalid OTP. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        // alert("An error occurred during OTP verification. Please try again later.");
      });
    // const password = generateRandomPassword();
    // setRandomPassword(password);
    // alert(`Your registration is successful. Your password is: ${password}`);
	// handleSubmit(e);
	
	alert("Username and password successfully sent to your email.");
	
    setShowOTPDialog(false);
  };

  const registerData = () => {
    const selectedDistrict = districts.find(
      (district) => district.name === data.district
    );
    if (!selectedDistrict) {
      setError("Please select a valid district.");
      return;
    }

    const formData = new FormData();
    formData.append("prereg_name", data.firstName);
    formData.append("prereg_email", data.email);
    formData.append("prereg_mob", data.phone);
    formData.append("districtd", selectedDistrict.value);

    console.log(formData);

    axios
      .post(
        "https://yip.kerala.gov.in/yipapp/index.php/Idea2021/add_pre_reg",
        formData
      )
      .then(() => {
        alert("Registered Successfully");
        // Show OTP verification dialog after successful registration
      })
      .catch((err) => {
        console.log(err);
        // alert(
        //   "An error occurred during registration. Please try again later."
        // );
      });
	  setinput({
		prereg_name: "",
    prereg_email: "",
    prereg_mob: "",
    districtd: "",
	})
  
	
    setShowOTPDialog(true);
  };

  /************************************************************************************************************************ */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    registerData();
  };

  const handleInputChange = (e) => {
    handleChange(e);
    handleChange1(e);
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleFormSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="firstName"
              onChange={handleInputChange}
              value={data.firstName}
              required
              className={styles.input}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={data.email}
              required
              className={styles.input}
            />
            <select
              name="district"
              onChange={handleInputChange}
              value={data.district}
              required
              className={styles.input}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.value} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={handleInputChange}
              value={data.phone}
              required
              className={styles.input}
            />
            {/* <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={data.password}
              required
              className={styles.input}
            /> */}
			{/* <label value={data.password} name={randomPassword} onChange={handleInputChange}>{randomPassword}</label> */}
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>



	  <Dialog open={showOTPDialog} onClose={handleCloseDialog}>
                <DialogTitle>OTP Verification</DialogTitle>
                <DialogContent>
                    <p>Please enter the OTP sent to your email/phone number.</p>
                    <TextField
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={handleOTPChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleOTPSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
};
export default Signup;