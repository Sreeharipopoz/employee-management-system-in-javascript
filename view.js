const url = new URL(window.location.href);
const id = url.searchParams.get('id');
console.log(id);
let viewData = [];

const viewEmployee = async (employeeId) => {
      
  try {
    const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employee data');
    }

    viewData = await response.json();
    data = viewData;
    console.log(viewData);
    viewEmp(viewData); // Pass viewData to viewEmp

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

viewEmployee(id);

function viewEmp(employee) {             // Accept employee as parameter
  
  const [day,month,year] = employee.dob.split('-')
  const newyear = `${year}`
  const dates = new Date()
  
  const yearcalc=dates.getFullYear()
  const age = Math.abs(yearcalc-newyear)

document.getElementById('imageView').src = `http://localhost:3000/employees/${employee.id}/avatar`;
document.getElementById('nameview').innerText = `${employee.salutation}. ${employee.firstName} ${employee.lastName}`;
document.getElementById('employeeQualification').innerText = employee.qualifications
document.getElementById('employeeNumber').innerText =employee.phone
document.getElementById('emailview').innerText =employee.email
document.getElementById('employeeGender').innerText =employee.gender
document.getElementById('employeeDob').innerText =employee.dob
document.getElementById('employeeAddress').innerText =`${employee.address} ${employee.country} ${employee.state} ${employee.pin} `
document.getElementById('employeeUsername').innerText =employee.username
document.getElementById('employeeAge').innerText = age


}
document.getElementById('viewEdits').addEventListener('click', ()=>{
  editedEmplolyee(id)

})


//--------------------------------------------------------------Edit employee popup----------------------------------------------------------------`--------

function editemployeepop()  {
  const edit = document.getElementById("viewEditEmp");
  const overlay = document.getElementById("overlay");

  // Display the popup and overlay
  edit.style.display = "block";
  overlay.style.display = "block";
}
function closeeditpop() {
  const closeEmployeepop = document.getElementById("viewEditEmp");
  const overlay = document.getElementById("overlay");

  // Close the popup and overlay
  closeEmployeepop.style.display = "none";
  overlay.style.display = "none";
}

//-------------------------------------------------------------Editing upload image----------------------------------------------------------------------------------------------------------

let editpic = document.getElementById('editimage');
let editInputFile = document.getElementById('input-editfile');

editInputFile.onchange = function (){             
  editpic.src = URL.createObjectURL(editInputFile.files[0])
}

// ------------------------------------------------------------------------Edit employee--------------------------------------------------------------------------------------------------





async function editedEmplolyee(id){

  editemployeepop()
  try {
    const response = await fetch(`http://localhost:3000/employees/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch employee data for editing');
    }

    userDatas = await response.json();

    // Populate the edit form fields with the fetched employee data
    document.getElementById('editimage').src = `http://localhost:3000/employees/${id}/avatar`;
    document.getElementById("saleditnme").value = userDatas.salutation;
    document.getElementById("firsteditnme").value = userDatas.firstName;
    document.getElementById("laseditnme").value = userDatas.lastName;
    document.getElementById("exampleInputEmail1sedit").value = userDatas.email;
    document.getElementById("typePhoneededit").value = userDatas.phone;
    document.getElementById("qualeditnme").value = userDatas.qualifications;
    document.getElementById("addressedit").value = userDatas.address;
    document.getElementById("citnmeedit").value = userDatas.city;
    document.getElementById("stenmeedit").value = userDatas.state;
    document.getElementById("counnmeedit").value = userDatas.country;
    document.getElementById("editdateedit").value = userDatas.dob.split("-").reverse().join("-");
    document.getElementById("pinzipedit").value = userDatas.pin;
    document.getElementById("maleCheckedit").checked = userDatas.gender === "male";
    document.getElementById("femaleradioedit").checked = userDatas.gender === "female";
    document.getElementById("useredit").value = userDatas.username;
    document.getElementById("passedit").value = userDatas.password;


} catch (error) {
  console.error('Error fetching data for editing:', error);
}

document.getElementById("submitEditBtn").onclick = async (e) => {
  e.preventDefault
  const validations = editViewFormValidation()
  if(!validations){
    return
  }
  else{
    postViewEdit(id)
    closeeditpop()
  }

}

}

async function postViewEdit(id){
  
   const updatedUser = {
    pin: document.getElementById("pinzipedit").value,
    salutation: document.getElementById("saleditnme").value,
    firstName: document.getElementById("firsteditnme").value,
    lastName: document.getElementById("laseditnme").value,
    email: document.getElementById("exampleInputEmail1sedit").value,
    phone: document.getElementById("typePhoneededit").value,
    qualifications: document.getElementById("qualeditnme").value,
    address: document.getElementById("addressedit").value,
    city: document.getElementById("citnmeedit").value,
    state: document.getElementById("stenmeedit").value,
    country: document.getElementById("counnmeedit").value,
    dob: document.getElementById("editdateedit").value.split("-").reverse().join("-"),
    gender: document.getElementById("maleCheckedit").checked ? "male" : "female",
    username: document.getElementById("useredit").value,
    password: document.getElementById("passedit").value
};

try {
    const putResponse = await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(updatedUser),
    });

    if (!putResponse.ok) {
        throw new Error('Failed to update employee data');
    }

    // Check if there's a new avatar image selected
    const editInputFile = document.getElementById('input-editfile');
    if (editInputFile.files.length > 0) {
        const formdata = new FormData();
        formdata.append("avatar", editInputFile.files[0]);

        const avatarResponse = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
            method: "POST",
            body: formdata,
        });

        if (!avatarResponse.ok) {
            throw new Error('Failed to upload avatar for employee');
        }
    }

    Swal.fire({
      title: "Successfully Edited Data",
    
      icon: "success"
    });

    viewEmployee(id);

   
} catch (error) {
    console.error('Error updating employee:', error);

    Swal.fire({
      title: 'Error',
      text: 'Error updating employee data. Please try again.',
      icon: 'error',
  });
}

}


// ----------------------------------------------------------------------------------Validation viewEdit Form------------------------------------------------------------------


const editViewFormValidation = () =>{

  const salutationVal = document.getElementById("saleditnme")
  const firstNameVal = document.getElementById("firsteditnme")
  const lastNameVal  = document.getElementById("laseditnme")
  const emailVal  = document.getElementById("exampleInputEmail1sedit")
  const phoneVal  = document.getElementById("typePhoneededit")
  const qualificationsVal  = document.getElementById("qualeditnme")
  const addressVal  = document.getElementById("addressedit")
  const dobVal  = document.getElementById("editdateedit")
  const cityVal  = document.getElementById("citnmeedit")
  const stateVal = document.getElementById("stenmeedit")
  const countryVal  = document.getElementById("counnmeedit")
  const zipVal  = document.getElementById("pinzipedit")
  const usernameVal  = document.getElementById("useredit")
  const passwordVal  = document.getElementById("passedit")
  const male  = document.getElementById("maleCheckedit")
  const female  = document.getElementById("femaleradioedit")
  

  salutationVal.addEventListener('input', () =>{
    document.getElementById('salValiEditView').textContent = ``;
    if(salutationVal.value === ``){
      document.getElementById('salValiEditView').textContent = "Select a salutation"
    }
  })

  firstNameVal.addEventListener('input', () =>{
    document.getElementById('frstValiEditView').textContent = ``;
    if(!namePattern.test(firstNameVal.value)){
      document.getElementById('frstValiEditView').textContent = "Enter valid firstName"
    }
  })

  lastNameVal.addEventListener('input', () =>{
    document.getElementById('lstValiEditView').textContent = ``;
    if(!namePattern.test(lastNameVal.value)){
      document.getElementById('lstValiEditView').textContent = "Enter valid lastName"
    }
  })

  emailVal.addEventListener('input', () =>{
    document.getElementById('emilValiEditView').textContent = ``;
    if(!emailPattern.test(emailVal.value)){
      document.getElementById('emilValiEditView').textContent = "Enter a valid email id"
    }
  })

  phoneVal .addEventListener('input', () =>{
    document.getElementById('phneValiEditView').textContent = ``;
    if(!phonePattern.test(phoneVal.value)){
      document.getElementById('phneValiEditView').textContent = "Phone number should be 10 digits"
    }
  })

  qualificationsVal.addEventListener('input', () =>{
    document.getElementById('qalValiEditView').textContent = ``;
    if(qualificationsVal.value === ``){
      document.getElementById('qalValiEditView').textContent = "qualification is Required"
    }
  })

  addressVal.addEventListener('input', () =>{
    document.getElementById('addrsValiEditView').textContent = ``;
    if(addressVal.value === ``){
      document.getElementById('addrsValiEditView').textContent = "address is Required"
    }
  })

  dobVal.addEventListener('input', () =>{
    document.getElementById('dateValiEditView').textContent = ``;
    if(dobVal.value === ``){
      document.getElementById('dateValiEditView').textContent = "dob is Required"
    }
  })

  cityVal.addEventListener('input', () =>{
    document.getElementById('cityValiEditView').textContent = ``;
    if(cityVal.value === ``){
      document.getElementById('cityValiEditView').textContent = "city is Required"
    }
  })

  stateVal .addEventListener('input', () =>{
    document.getElementById('stateValiEditView').textContent = ``;
    if(stateVal.value === ``){
      document.getElementById('stateValiEditView').textContent = "*select a state"
    }
  })

  countryVal.addEventListener('input', () =>{
    document.getElementById('cntrylValiEditView').textContent = ``;
    if(countryVal.value === ``){
      document.getElementById('cntrylValiEditView').textContent = "*Select a Country"
    }
  })

  zipVal.addEventListener('input', () =>{
    document.getElementById('pinValiEditView').textContent = ``;
    if(zipVal.value === ``){
      document.getElementById('pinValiEditView').textContent = "*Pin is Required"
    }
  })

  usernameVal.addEventListener('input', () =>{
    document.getElementById('userValiEditView').textContent = ``;
    if(usernameVal.value === ``){
      document.getElementById('userValiEditView').textContent = "*username is Required"
    }
  })

  document.getElementById("viewEditEmp").addEventListener("input", () => {
    if(male.checked || female.checked){
      genderValidation.textContent = ``
    }
  })


  passwordVal.addEventListener('input', () =>{
    document.getElementById('pasValiEditView').textContent = ``;
    if(!passwordPattern.test(passwordVal.value)){
      document.getElementById('pasValiEditView').textContent = "password should contain atleast 8 character with number, symbol, capital and small letters"
    }
  })
  
  const salutation = salutationVal.value.trim()
  const firstName = firstNameVal.value.trim()
  const lastName = lastNameVal.value.trim()
  const email = emailVal.value.trim()
  const phone = phoneVal.value.trim()
  const username = usernameVal.value.trim()
  const password = passwordVal.value.trim()
  const qualification = qualificationsVal.value.trim()
  const address = addressVal.value.trim()
  const country = countryVal.value.trim()
  const state = stateVal.value.trim()
  const city = cityVal.value.trim()
  const pinZip = zipVal.value.trim()
  const gender = document.querySelector('input[name="gender"]:checked')
  const dobValue = dobVal.value.trim()
  const addDOBValidation = document.getElementById("dateValiEditView")
  const genderValidation = document.getElementById("gendValiEditView")

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  const phonePattern = /^\d{10}$/
  const namePattern = /^[a-zA-Z]+$/
  const passwordPattern = new RegExp("(?=.*[a-z])" + "(?=.*[A-Z])" + "(?=.*\\d)" + "(?=.*[^a-zA-Z0-9])" + ".{8,}")

  let isValid = true

  if(gender){
    genderValidation.textContent = ``  
  }
  else{
    genderValidation.textContent = `Please select a gender`
    isValid = false
  }
  if(dobValue === ``){
    addDOBValidation.textContent = `Please select Date of Birth`
    isValid = false
  }
  if(!phonePattern.test(phone)){
    document.getElementById("phneValiEditView").textContent = "Phone number should be 10 digits"
    isValid = false
  }
  if(!emailPattern.test(email)){
    document.getElementById("emilValiEditView").textContent = "Please enter a valid email id"
    isValid = false
  }
  if(!namePattern.test(firstName)){
    document.getElementById("frstValiEditView").textContent = "Enter valid first name"
    isValid = false
  }
  if(!namePattern.test(lastName)){
    document.getElementById("lstValiEditView").textContent = "Enter valid last name"
    isValid = false
  }
  if(!passwordPattern.test(password)){
    document.getElementById("pasValiEditView").textContent = "password should contain atleast 8 character with number, symbol, capital and small letters"
    isValid = false
  }
  if(salutation === ``){
    document.getElementById("salValiEditView").textContent = "Please select a salutation"
    isValid = false
  }
  if(username === ``){
    document.getElementById("userValiEditView").textContent = "Enter a User name"
    isValid = false
  }
  if(qualification === ``){
    document.getElementById("qalValiEditView").textContent = "Enter qualification"
    isValid = false
  }
  if(address === ``){
    document.getElementById("addrsValiEditView").textContent = "Enter address"
    isValid = false
  }
  if(state === ``){
    document.getElementById("stateValiEditView").textContent = "select a state"
    isValid = false
  }
  if(country === ``){
    document.getElementById("cntrylValiEditView").textContent = "select a country"
    isValid = false
  }
  if(city === ``){
    document.getElementById("cityValiEditView").textContent = "Enter city"
    isValid = false
  }
  if(pinZip === ``){
    document.getElementById("pinValiEditView").textContent = "Enter Pin / Zip code"
    isValid = false
  }
  return isValid

}

//--------------------------------------------------------------Delete Employee pop up-------------------------------------------------------------------------------

function delEmployeepop ()  {
  const del = document.getElementById('delemployee');
  const overlay = document.getElementById('overlay');

  // Display the popup and overlay
  del.style.display = "block";
  overlay.style.display = "block";
}
function closedelpopup() {
  const closeEmployeepop = document.getElementById('delemployee');
  const overlay = document.getElementById('overlay');

  // Close the popup and overlay
  closeEmployeepop.style.display = "none";
  overlay.style.display = "none";
}

//------------------------------------------------------delete view Employeee---------------------------------------------------------------------------------------

document.getElementById('viewdelete').addEventListener('click', ()=>{

  ViewdelEmployee(id)

})


 function ViewdelEmployee(id) {

  delEmployeepop () ;

  const deleteButton = document.getElementById("deletebtn");

deleteButton.onclick =  async (e)=>{
  e.preventDefault();

  const deleted = await fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
    headers: {"Content-Type":"application/json"}
  });
  if (!deleted.ok) {
    throw new Error('Failed to delete employee');
  }
  Swal.fire({
    title: "Successfully Deleted Data",
  
    icon: "success"
  });
  
  window.location.href = "index.html";
 closedelpopup() 
console.log(userDatas)
}
 
}
