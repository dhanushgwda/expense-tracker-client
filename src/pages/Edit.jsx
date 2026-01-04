import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';

export default function Edit() {
  const params=useParams()
  // console.log(params.id)
  const {id}=useParams();
  const navigate=useNavigate();
const [formData, setformData] = useState({
  title:"",
  amount:0,
  category:"",

})
const[isLoading,setIsLoading]=useState(false)
const fetchSingleExpenses=async()=>{
  try {
    const res=await axios.get(`http://localhost:5000/api/expense/view/${id}`)
    // console.log(res.data)
    if (res.data.expenseDetails) {
      setformData(res.data.expenseDetails)
    } else {
     toast.error(res.data.message)      
    }
  } catch (error) {
    console.log(error)
  }
};
 useEffect(()=>{
   fetchSingleExpenses();
  },[])
const handleSubmit=async()=>{
  // console.log(formData)
  // const res=await  axios.post()
  setIsLoading(true);
  try {
    const res=await  axios.put(`http://localhost:5000/api/expense/edit/${id}`,formData);
  // console.log(res)
  if(res.data.success){
 toast.success(res.data.message);
//  navigate('/')
 setTimeout(()=>{
  navigate('/')
 },2000)
  }else{
    toast.error(res.data.message)
  }
  } catch (error) {
    console.log(error);
  }finally{
    setTimeout(()=>{
    setIsLoading(false);
  },2000);
}
};
  return (
    <Box>
        <Box sx={{textAlign:'center'}}>
            <Typography  variant='h4'>Add Expense Details </Typography>
        </Box>
        <Box sx={{ backgroundColor:'#f5dcf5',p:4,display:'flex',justifyContent:'center',alignItems:'center',}}>
            <Paper sx={{width:'70%',p:3}}>
                <TextField 
                value={formData.title}
                fullWidth 
                onChange={(e)=>setformData({...formData, title:e.target.value})}
                label="Enter expense title"
                placeholder='Enter expense title here'sx={{mb:2}}/>
                <TextField 
                value={formData.amount}
                fullWidth 
                     onChange={(e)=>setformData({...formData, amount:e.target.value})}
                label="Enter expense amount"
                placeholder='Enter expense amount here'
                type="number"
                sx={{mb:2}}/>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select expense category</InputLabel>
        <Select
        value={formData.category}
           onChange={(e)=>setformData({...formData, category:e.target.value})}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Select expense category"
          // onChange={handleChange}
          sx={{mb:2}}
        >
          <MenuItem value={"Transport"}>Transport</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
                <Button 
                onClick={handleSubmit} 
                sx={{mb:1}}
                variant="contained"
                fullWidth loading={isLoading}>Submit</Button>
                <Button component={Link}
                 to={"/"}sx={{mb:1}}
                 variant="outlined" color="secondary"
                 fullWidth>View Entries</Button>
            </Paper>
        </Box>
    </Box>
  )
}
