let data = [];             //storing the data of this array

async function fetchData(){
  try{
    const response = await fetch('http://localhost:3000/employees')
  if (!response.ok){
    throw new Error('Network response was not ok');
  }
  data = await response.json();
  console.log(data)
  addshow()
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }
}
fetchData()


//------------------------------------------------------------------add employeee popup---------------------------------------------------------------------

function showAddEmployeePopup(){

let add = document.getElementById('add-employee')
let overlay = document.getElementById('overlay')

 // Display the popup and overlay
add.style.display = "block"
overlay.style.display = "block"

}

function closeAddEmployeePopup(){

  let closeaddpop = document.getElementById('add-employee')
  let overlay = document.getElementById('overlay')

  //close the popup and overlay
  closeaddpop.style.display = "none"
  overlay.style.display = "none"

}


//--------------------------------------------------------------adding table show-----------------------------------------------------------------------------

function addshow(){

  const table = document.getElementById("data-input");            
  let rows = '';

  for (let i = 0; i < data.length; i++) {
    rows +=`
      <tr>
        <td>${i + 1}</td>
        <td><img class="uploadimg" src="http://localhost:3000/employees/${data[i].id}/avatar">  ${data[i].salutation} . ${data[i].firstName} ${data[i].lastName}</td>
        <td>${data[i].email}</td>
        <td>${data[i].phone}</td>
        <td>${data[i].gender}</td>
        <td>${data[i].dob}</td>
        <td>${data[i].country}</td> 
       <td>
       <div class="dropdown">        
              <button id="dropdownButton" class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-ellipsis"></i>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">View</a></li>
                <li><a class="dropdown-item" href="#" onclick="editedEmplolyee('${data[i].id}')">Edit</a></li>
                <li><a class="dropdown-item" href="#" onclick="delEmployee('${data[i].id}') ">Delete</a></li>

              </ul>
           </div>
      </td>
      </tr>
    `;
  }

  table.innerHTML = rows;
}

//----------------------------------------------------------upload-image----------------------------------------------------------------------------------

// let newprofilepic = document.getElementById('uploadimg')
// let imgupload = document.getElementById('upload')
// imgupload.onchange = function (){
//   newprofilepic.src = URL.createObjectURL(imgupload.files[0])
// }


//---------------------------------------------------------------adding-employee-----------------------------------------------------------------------------------



async function postData() {
  // Retrieve form input values
  const salutation = document.getElementById("sal-nme").value;
  const firstName = document.getElementById("fir-nme").value;
  const lastName = document.getElementById("las-nme").value;
  const email = document.getElementById("exampleInputEmail1").value;
  const phone = document.getElementById("typePhone").value;
  const qualifications = document.getElementById("qual-nme").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("cit-nme").value;
  const state = document.getElementById("ste-nme").value;
  const country = document.getElementById("coun-nme").value;
  const dob = document.getElementById("date").value;
  const zip = document.getElementById("pin-zip").value;
  const male = document.getElementById("maleCheck").checked;
  const female = document.getElementById("femaleCheck").checked;
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;
  


  // Construct the request body
  let newUser = {
      salutation: salutation,
      firstName: firstName,
      lastName: lastName,
      email: email, 
      phone: phone,
      qualifications: qualifications,
      address: address,
      city: city,
      state: state, 
      country: country,
      dob: dob.split("-").reverse().join("-"),
      pin: zip,
      gender: male ? "male" : (female ? "female" : "unknown"),
      username: username,
      password: password
  };

//   try {
//       // Send POST request to add the new user
//       const response = await fetch('http://localhost:3000/employees', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newUser),
//       });

//       if (!response.ok) {
//           throw new Error('Failed to add employee');
//       }

//       data.push(newUser);

//       //  Update the UI by calling addshow() with the new data
//       addshow()

//       console.log('Employee added successfully'); 
//      console.log(data)
//      closeAddEmployeePopup()
     
//   } catch (error) {
//       console.error('Error adding employee:', error);
//   }
// }




// //----------------------------------------------------------Delete Employee Popup--------------------------------------------------------------------------

// function delEmployeepop ()  {
//   const del = document.getElementById('delemployee');
//   const overlay = document.getElementById('overlay');

//   // Display the popup and overlay
//   del.style.display = "block";
//   overlay.style.display = "block";
// }
// function closedelpopup() {
//   const closeEmployeepop = document.getElementById('delemployee');
//   const overlay = document.getElementById('overlay');

//   // Close the popup and overlay
//   closeEmployeepop.style.display = "none";
//   overlay.style.display = "none";
// }


// //------------------------------------------------------delete Employeee---------------------------------------------------------------------------------------

// function delEmployee(id) {
//   delEmployeepop();

//   const deleteButton = document.getElementById("deletebtn");

//   deleteButton.onclick = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`http://localhost:3000/employees/${id}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete employee');
//       }

//       // Remove the deleted employee from the data array
//       data = data.filter(emp => emp.id !== id);

//       // Update the table with the updated data
//       addshow();

//       console.log('Employee deleted successfully');
//       console.log(data);
//       // Close the delete confirmation popup
//       closedelpopup();

//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };
// }


// //----------------------------------------------Edit employee popup----------------------------------------

// function editemployeepop ()  {
//   const edit = document.getElementById("editemployee");
//   const overlay = document.getElementById("overlay");

//   // Display the popup and overlay
//   edit.style.display = "block";
//   overlay.style.display = "block";
// }
// function closeeditpop() {
//   const closeEmployeepop = document.getElementById("editemployee");
//   const overlay = document.getElementById("overlay");

//   // Close the popup and overlay
//   closeEmployeepop.style.display = "none";                                                              
//   overlay.style.display = "none";
// }


// //--------------------------------------------EDit employee------------------------------------------------

// // async function editedEmplolyee(id){

// //   editemployeepop () 

// //   try{
// //     const response = await fetch(`http://localhost:3000/employees/${id}`);
// //   if (!response.ok){
// //     throw new Error('Network response was not ok');
// //   }
// //   data = await response.json();
// //   console.log(data)  

// //    //------------------showing the edit table in values-----------------------------------------
   
// //     document.getElementById("saleditnme").value = data.salutation;
// //     document.getElementById("firsteditnme").value = data.firstName;
// //     document.getElementById("laseditnme").value = data.lastName;
// //     document.getElementById("exampleInputEmail1sedit").value = data.email;
// //     document.getElementById("typePhoneededit").value = data.phone;
// //     document.getElementById("qualeditnme").value = data.qualifications;
// //     document.getElementById("addressedit").value = data.address;
// //     document.getElementById("citnmeedit").value = data.city;
// //     document.getElementById("stenmeedit").value = data.state;
// //     document.getElementById("counnmeedit").value = data.country;
// //     document.getElementById("editdateedit").value = data.dob.split("-").reverse().join("-");
// //     document.getElementById("pinzipedit").value = data.pin;
// //     document.getElementById("maleCheckedit").checked = data.gender === "male";
// //     document.getElementById("femaleradioedit").checked = data.gender === "female";
// //     document.getElementById("useredit").value = data.username;
// //     document.getElementById("passedit").value = data.password;


// //   // Add event listener to the submit button
// //     document.getElementById("submitEditBtn").addEventListener('click', async function(e) {
// //       e.preventDefault();

// //       // Gather updated data from the form
// //       const updatedUser = {
// //         pin: document.getElementById("pinzipedit").value,
// //         salutation: document.getElementById("saleditnme").value,
// //         firstName: document.getElementById("firsteditnme").value,
// //         lastName: document.getElementById("laseditnme").value,
// //         email: document.getElementById("exampleInputEmail1sedit").value,
// //         phone: document.getElementById("typePhoneededit").value,
// //         qualifications: document.getElementById("qualeditnme").value,
// //         address: document.getElementById("addressedit").value,
// //         city: document.getElementById("citnmeedit").value,
// //         state: document.getElementById("stenmeedit").value,
// //         country: document.getElementById("counnmeedit").value,
// //         dob: document.getElementById("editdateedit").value.split("-").reverse().join("-"),
// //         gender: document.getElementById("maleCheckedit").checked ? "male" : "female",
// //         username: document.getElementById("useredit").value,
// //         password: document.getElementById("passedit").value
// //       };

      
// //       try {
// //         const putResponse = await fetch(`http://localhost:3000/employees/${id}`, {
// //           method: 'PUT',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(updatedUser),
// //         });

// //         if (putResponse.ok) {
// //           console.log('Employee updated successfully');
// //           closeeditpop(); // Close the edit popup after successful update
        
// //         } else {
// //           console.error('Failed to update employee');
// //         }
// //       } catch (error) {
// //         console.error('Error updating employee:', error);
// //       }
// //     });
// //    }
// //     catch (error) {
// //     console.error('Error fetching data:', error);
// //   }
// // }
// async function editedEmplolyee(id) {
//   editemployeepop();

//   try {
//       const response = await fetch(`http://localhost:3000/employees/${id}`);
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//      allDatas = await response.json();

//       // Populate the edit form fields with the fetched employee data
//       document.getElementById()
//       document.getElementById("saleditnme").value  = allDatas.salutation;
//       document.getElementById("firsteditnme").value  = allDatas.firstName;
//       document.getElementById("laseditnme").value  = allDatas.lastName;
//       document.getElementById("exampleInputEmail1sedit").value  = allDatas.email;
//       document.getElementById("typePhoneededit").value  = allDatas.phone;
//       document.getElementById("qualeditnme").value  = allDatas.qualifications;
//       document.getElementById("addressedit").value  = allDatas.address;
//       document.getElementById("citnmeedit").value  = allDatas.city;
//       document.getElementById("stenmeedit").value  = allDatas.state;
//       document.getElementById("counnmeedit").value  = allDatas.country;
//       document.getElementById("editdateedit").value  = allDatas.dob.split("-").reverse().join("-");
//       document.getElementById("pinzipedit").value  = allDatas.pin;
//       document.getElementById("maleCheckedit").checked  = allDatas.gender === "male";
//       document.getElementById("femaleradioedit").checked  = allDatas.gender === "female";
//       document.getElementById("useredit").value  = allDatas.username;
//       document.getElementById("passedit").value  = allDatas.password;

//       // Add event listener to the submit button
//       document.getElementById("submitEditBtn").addEventListener('click', async function(e) {
//           e.preventDefault();

//           // Gather updated data from the form
//           const updatedUser = {
//               pin: document.getElementById("pinzipedit").value,
//               salutation: document.getElementById("saleditnme").value,
//               firstName: document.getElementById("firsteditnme").value,
//               lastName: document.getElementById("laseditnme").value,
//               email: document.getElementById("exampleInputEmail1sedit").value,
//               phone: document.getElementById("typePhoneededit").value,
//               qualifications: document.getElementById("qualeditnme").value,
//               address: document.getElementById("addressedit").value,
//               city: document.getElementById("citnmeedit").value,
//               state: document.getElementById("stenmeedit").value,
//               country: document.getElementById("counnmeedit").value,
//               dob: document.getElementById("editdateedit").value.split("-").reverse().join("-"),
//               gender: document.getElementById("maleCheckedit").checked ? "male" : "female",
//               username: document.getElementById("useredit").value,
//               password: document.getElementById("passedit").value
//           };

//           try {
//               const putResponse = await fetch(`http://localhost:3000/employees/${id}`, {
//                   method: 'PUT',
//                   headers: {
//                       'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify(updatedUser),
//               });

//               if (!putResponse.ok) {
//                   throw new Error('Failed to update employee');
//               }

//               // Update employee data in the frontend
//               const updatedEmployeeData = await putResponse.json();
//               // Close the edit popup after successful update
//               closeeditpop();

//               // Upload the avatar if a new file is selected
//               const inputFile = document.getElementById('upload');
//               if (inputFile.files.length > 0) {
//                   const formData = new FormData();
//                   formData.append("avatar", inputFile.files[0]);

//                   const avatarResponse = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
//                       method: "POST",
//                       body: formData,
//                   });

//                   if (!avatarResponse.ok) {
//                       throw new Error('Failed to upload avatar for employee');
//                   }
//               }

//               console.log('Employee updated successfully:', updatedEmployeeData);
//           } catch (error) {
//               console.error('Error updating employee:', error);
//           }
//       });
//   } catch (error) {
//       console.error('Error fetching data:', error);
//   }
// }



// //-------------------------------------------------------validation add-form-----------------------------------------------------------------------------------

// errormsg = document.getElementsByClassName('Error')

// function formvalidation(){

//   const salutation = document.getElementById("sal-nme")
//   const firstName = document.getElementById("fir-nme")
//   const lastName = document.getElementById("las-nme")
//   const email = document.getElementById("exampleInputEmail1")
//   const phone = document.getElementById("typePhone")
//   const qualifications = document.getElementById("qual-nme")
//   const address = document.getElementById("address")
//   const dob = document.getElementById("date")
//   const city = document.getElementById("cit-nme")
//   const state = document.getElementById("ste-nme")
//   const country = document.getElementById("coun-nme")
//   const zip = document.getElementById("pin-zip")
//   const username = document.getElementById("user")
//   const password = document.getElementById("pass")
//   const male = document.getElementById("maleCheck")
//   const female = document.getElementById("femaleCheck")


// let mobileValidation = (emp,index,message)=>{
//   if(emp.value.trim() === ''){
//     errormsg[index].innerText = message;
//   } else if(emp.value.length !== 10) {
//     errormsg[index].innerText = "Mobile number must be a 10 digit"; 
//   } else {
//     errormsg[index].innerText ="";
//   }
// };

// let gendervalidation = (index,message)=>{
//   if(!male.checked && !female.checked){
//     errormsg[index].innerText = message;
//   } else {
//     errormsg[index].innerText = "";
//   }
// }

// let validationform =(emp,index,message)=>{
//   if(emp.value.trim() ===""){
//     errormsg[index].innerText = message;
//   } else {
//     errormsg[index].innerText = "";
//   }
// }

// let emailvalidation = (emp,index,message)=>{
//   let emailregex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

//   if(emp.value.trim() === ''){
//     errormsg[index].innerText = message;
//   } else if(!emp.value.match(emailregex)){
//     errormsg[index].innerText = "Check Email Format";
//   } else {
//     errormsg[index].innerText = "";
//   }
// }

// validationform(salutation,0,"Select Salutation")
// validationform(firstName,1,"First Name is required")
// validationform(lastName,2,"Last Name is required")
// emailvalidation(email,3,"Email is required")
// mobileValidation(phone,4,"Phone is required")
// validationform(username,5,"Username is required")
// validationform(password,6,"Password is required")
// validationform(dob,7,"Date of Birth is required")
// gendervalidation(8,"Gender is required")
// validationform(qualifications,9,"Qualifications is required")
// validationform(address,10,"Address is required")
// validationform(country,11,"Country is required")
// validationform(state,12,"State is required")
// validationform(city,13,"City is required")
// validationform(zip,14,"PIN is required")
// }
// document.getElementById('addEmpbtn').addEventListener('click',(e)=>{
//   e.preventDefault()
//   formvalidation();
//   postData();
//   // clearForm()
//   // Note: Ensure postData function is available and properly defined
// })

// // function clearForm() {
// //   var form = document.getElementById("add-employee");
// //   form.reset();
// // }


// //-----------------------------------------------------making search function-------------------------------------------------------------------------------

// const searchInput = document.getElementById('srch');
// const tabeBody = document.getElementById('data-input');

// searchInput.addEventListener('input', (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     const filteredEmployees = data.filter(employee => {
//         return(
//             employee.firstName.toLowerCase().includes(searchValue) ||
//             employee.lastName.toLowerCase().includes(searchValue) ||
//             employee.email.toLowerCase().includes(searchValue) ||
//             employee.phone.toLowerCase().includes(searchValue)
//         );
//     });
//     let rows = '';
//     filteredEmployees.forEach(employee => {

//       const index = data.indexOf(employee)  //find the index of the element
//       row= `
//       <tr>
//       <td>${index+1}</td>
//       <td><img class="uploadimg" src="http://localhost:3000/employees/${employee.id}/avatar">  ${employee.salutation} . ${employee.firstName} ${employee.lastName}</td>
//       <td>${employee.email}</td>
//       <td>${employee.phone}</td>
//       <td>${employee.gender}</td>
//       <td>${employee.dob}</td>
//       <td>${employee.country}</td> 
//      <td>
//      <div class="dropdown">        
//             <button id="dropdownButton" class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
//             <i class="fa-solid fa-ellipsis"></i>
//             </button>
//             <ul class="dropdown-menu">
//               <li><a class="dropdown-item" href="#">View</a></li>
//               <li><a class="dropdown-item" href="#" onclick="editedEmplolyee('${employee.id}')">Edit</a></li>
//               <li><a class="dropdown-item" href="#" onclick="delEmployee('${employee.id}') ">Delete</a></li>

//             </ul>
//          </div>
//     </td>
//     </tr>
//       `;
//     })
//     tabeBody.innerHTML = rows;
    
//   });

































// /////////////////////////////////////////////.then used in post element//////////////////////////////////////////////////


//     //   fetch(apiUrl, {
//   //     method: "POST",
//   //     headers: {
//   //         "Content-type": "application/json",
//   //     },
//   //     body: JSON.stringify(newUser),
//   // })
//   // .then(response => {
//   //     if (!response.ok) {
//   //         throw new Error('Failed to add employee in backend');
//   //     }
//   //     return response.json();
//   // })
//   // .then(respData => {
    
//   //   let inputFile = document.getElementById('upload');
//   //     const formdata = new FormData();
//   //     formdata.append("avatar", inputFile.files[0])

//   //     fetch(`http://localhost:3000/employees/${respData.id}/avatar`,{
//   //             method:"POST",
//   //            body: formdata,
//   //            })

//   //            allDatas.push(newUser);
//   //            addTableShow();
//   //            console.log(allDatas);

//   // })
//   // .catch(error => {
//   //     console.error('Error adding employee:', error);
//   // });


             

try{
  fetch(apiUrl,{
    method:"POST",
    headers:
    "content-type":"application/json",
    body:Json.stringify(newUser),
  });
  if(!reponse.ok){
    throw new error('failed to add employee in backend ');

  }
   const respdata= await response.json();
    const inputFile=document.getElementById('upload')
     const FormData=new FormData();
     FormData.append("avartar",inputFile.file[0]);
     const avatarResponse = await fetch(`http://localhost:3000/employees/${respdata.id}/avatar`,{
  method:"POST",
  body:FormData,
     });
     if(!avatarResponse.ok){
      throw new errror('failed to upload avartar for employee')
     }
     newUser.id=respdata.id
     allDatas.push(newUser);
     addTableShow();
     console.log(allDatas);

}catch(error){
  console.error('error adding employee',error);

}
}
document.getElementById('addEmpbtn').addEventListener('click',(e)=>{
  e.preventDefault();
  postData();
  closeAddEmployeePopup();
})

function delEmployeepop(){
  const del=document.getElementById('delemployee');
  const overlay=document.getElementById('overlay');
  del.style.display="block";
  overlay.style.display="block";

}
function  closedelpopup(){
  const closeEmployeepop=document.getElementById('delemployee');
   const  overlay=document.getElementById('overlay');

   closeAddEmployeePopup.style.display="none";
   overlay.style.display="none";

}
function delEmployee(id){
  delEmployee();
 const  deleteButtom=document.getElementById("deletebtn");
  deleteteButton.onclick = async (e)=>{
    (e).preventDefault();
    const deleted=fetch(`http://localhost:3000/employees/${id})`,{
      method:"DELETE",
      headers:{"Content-Type:application/json"}
    });
    if(!deleted.ok){
      throw new error('failed to delete the employee');
    }
    allDatas=allDatas.filter(emp=>emp.id !==id);
    addTableShow()
    closedelpopup()
    console.log(allDatas);
    
  }
}

