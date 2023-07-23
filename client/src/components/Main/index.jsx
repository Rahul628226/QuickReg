import React, { useState } from "react";
import axios from 'axios';
import {
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";

const Main = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    category: "",
    idProof: "",
    image: null,
    institutionName: "",
    institutionCategory: "",
    semesterYear: "",
    department: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
  });

  const inpHandler = (e) => {
	const { name, value, files } = e.target;
	if (name === 'image') {
		setFormData((formData) => ({ ...formData, image: files[0] }));
	} else {
		setFormData((formData) => ({ ...formData, [name]: value }));
	}
};

 
  const [successMessage, setSuccessMessage] = useState('');
 
  const clickHandler = async () => {
  try {
	const formData = new FormData();
	formData.append('name', formData.name);
	formData.append('email', formData.email);
	formData.append('mobile', formData.mobile);
	formData.append('gender', formData.gender);
	formData.append('dob', formData.dob);
    formData.append('category', formData.category); 
	formData.append('idProof', formData.idProof);
	formData.append('image', formData.image);
	formData.append('institutionName', formData.institutionName);
	formData.append('institutionCategory', formData.institutionCategory);
	formData.append('semesterYear', formData.semesterYear);
	formData.append('department', formData.department);
	formData.append('bankName', formData.bankName);
	formData.append('accountNumber', formData.accountNumber);
	formData.append('ifsc', formData.ifsc);


	const response = await axios.post('http://localhost:8080/api/addProfile', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	console.log(response.data);


} catch (error) {
	console.error(error);
	alert('Added successfully!')
}

setSuccessMessage('Added successfully!');

setFormData({
	name: "",
	email: "",
	mobile: "",
	gender: "",
	dob: "",
	category: "",
	idProof: "",
	image: null,
	institutionName: "",
	institutionCategory: "",
	semesterYear: "",
	department: "",
	bankName: "",
	accountNumber: "",
	ifsc: "",
});


}

  return (
	<><header style={{ background: 'blue'}}>
		  <h1 style={{ textAlign: "center", padding: "20px" }}>Registration Form</h1>
	  </header><div style={{ padding: "30px" }}>
			  <Typography variant="h4" align="center" gutterBottom>
				  
			  </Typography>
			  <Grid container spacing={2}>
				  <Grid item xs={12} md={6}>
					  <Paper elevation={3} style={{ padding: "20px" }}>
						  <Typography variant="h6" gutterBottom>
							  Add Ideator Details
						  </Typography>
						  <TextField
							  label="Name"
							  fullWidth
							  name="name"
							  value={formData.name}
							  onChange={inpHandler}
							  required />
						  <TextField
							  label="Email"
							  fullWidth
							  name="email"
							  value={formData.email}
							  onChange={inpHandler}
							  required
							  type="email" />
						  <TextField
							  label="Mobile"
							  fullWidth
							  name="mobile"
							  value={formData.mobile}
							  onChange={inpHandler}
							  required
							  type="tel" />
						  <FormControl fullWidth required>
							  <InputLabel id="gender-label">Gender</InputLabel>
							  <Select
								  labelId="gender-label"
								  id="gender"
								  name="gender"
								  value={formData.gender}
								  onChange={inpHandler}
							  >
								  <MenuItem value="Male">Male</MenuItem>
								  <MenuItem value="Female">Female</MenuItem>
								  <MenuItem value="Other">Other</MenuItem>
							  </Select>
						  </FormControl>
						  <TextField
							  label="Date of Birth"
							  fullWidth
							  name="dob"
							  value={formData.dob}
							  onChange={inpHandler}
							  type="date"
							  required />
						  <FormControl fullWidth required>
							  <InputLabel id="category-label">Category</InputLabel>
							  <Select
								  labelId="category-label"
								  id="category"
								  name="category"
								  value={formData.category}
								  onChange={inpHandler}
							  >
								  <MenuItem value="General">General</MenuItem>
								  <MenuItem value="OBC">OBC</MenuItem>
								  <MenuItem value="OEC">OEC</MenuItem>
								  <MenuItem value="SC/ST">SC/ST</MenuItem>
							  </Select>
						  </FormControl>
						  <FormControl fullWidth required>
							  <InputLabel id="id-proof-label">ID Proof</InputLabel>
							  <Select
								  labelId="id-proof-label"
								  id="idProof"
								  name="idProof"
								  value={formData.idProof}
								  onChange={inpHandler}
							  >
								  <MenuItem value="Adhar">Adhar</MenuItem>
								  <MenuItem value="Driving License">Driving License</MenuItem>
								  <MenuItem value="College ID">College ID</MenuItem>
								  <MenuItem value="PAN Card">PAN Card</MenuItem>
							  </Select>
						  </FormControl>
						  <TextField
							  label="Upload ID Proof"
							  fullWidth
							  type="file"
							  name="idProofFile"
							  onChange={inpHandler}
							  required />
					  </Paper>
				  </Grid>
				  <Grid item xs={12} md={6}>
					  <Grid container direction="column" spacing={2}>
						  <Grid item>
							  <Paper elevation={3} style={{ padding: "20px" }}>
								  <Typography variant="h6" gutterBottom>
									  Institution Details
								  </Typography>
								  <TextField
									  label="Institution Name"
									  fullWidth
									  name="institutionName"
									  value={formData.institutionName}
									  onChange={inpHandler}
									  required />
								  <FormControl fullWidth required>
									  <InputLabel id="institution-category-label">
										  Institution Category
									  </InputLabel>
									  <Select
										  labelId="institution-category-label"
										  id="institutionCategory"
										  name="institutionCategory"
										  value={formData.institutionCategory}
										  onChange={inpHandler}
									  >
										  <MenuItem value="Government">Government</MenuItem>
										  <MenuItem value="Aided">Aided</MenuItem>
										  <MenuItem value="Self Finance">Self Finance</MenuItem>
									  </Select>
								  </FormControl>
								  <TextField
									  label="Semester/Year/Class"
									  fullWidth
									  name="semesterYear"
									  value={formData.semesterYear}
									  onChange={inpHandler}
									  required />
								  <TextField
									  label="Department/Division"
									  fullWidth
									  name="department"
									  value={formData.department}
									  onChange={inpHandler}
									  required />
							  </Paper>
						  </Grid>
						  <Grid item>
							  <Paper elevation={3} style={{ padding: "20px" }}>
								  <Typography variant="h6" gutterBottom>
									  Bank Details
								  </Typography>
								  <TextField
									  label="Bank Name"
									  fullWidth
									  name="bankName"
									  value={formData.bankName}
									  onChange={inpHandler}
									  required />
								  <TextField
									  label="Account Number"
									  fullWidth
									  name="accountNumber"
									  value={formData.accountNumber}
									  onChange={inpHandler}
									  required />
								  <TextField
									  label="IFSC Code"
									  fullWidth
									  name="ifsc"
									  value={formData.ifsc}
									  onChange={inpHandler}
									  required />
							  </Paper>
						  </Grid>
					  </Grid>
				  </Grid>
			  </Grid>
			  <div style={{ textAlign: "center", marginTop: "20px" }}>
				  <Button variant="contained" color="primary" onClick={clickHandler}>
					  Submit
				  </Button>
			  </div>
		  </div></>
  );
};

export default Main;
