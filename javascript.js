let allDatas = [];       //storing allDatas in this array
const apiUrl = 'http://localhost:3000/employees';
let empDatas=[];
const table = document.getElementById('data-input');
let currentpage = 1;
let employeesPerPage = parseInt(document.getElementById('page-no').value);
let paginationList = document.getElementById('list');

// Backend to frontend data fetch

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        allDatas = data.reverse();
        empDatas=allDatas;
        console.log(allDatas);
        pagination();
        addTableShow(currentpage);
     
    } catch (error) {
        console.error('Error fetching data:', error);
        
    }
   
}

fetchData();

document.getElementById('page-no').addEventListener('change', function (e) {
    e.preventDefault();
    employeesPerPage = parseInt(document.getElementById('page-no').value);
    addTableShow(currentpage);
    pagination();
});

// Adding table show
function addTableShow(page) {
    let start = (page - 1) * employeesPerPage;
    let end = start + employeesPerPage;
    let finalData = allDatas.slice(start, end);
    let rows = '';
   i = start;
   finalData.forEach((employee) => {
        i++;
        const siNo = i>9 ? `#${i}` : `#0${i}`;
        rows += `
            <tr>
                <td>${siNo}</td>
                <td><img class="uploadimgs" src="http://localhost:3000/employees/${employee.id}/avatar"> ${employee.salutation} . ${employee.firstName} ${employee.lastName}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.gender}</td>
                <td>${employee.dob}</td>
                <td>${employee.country}</td> 
                <td>
                    <div class="dropdown">        
                        <button id="dropdownButton" class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="index1.html?id=${employee.id}"><i class="fa-solid fa-eye"></i>View</a></li>
                            <li><a class="dropdown-item" href="#" onclick="editEmployee('${employee.id}')"><i class="fa-solid fa-pen"></i>Edit</a></li>
                            <li><a class="dropdown-item" href="#" onclick="delEmployee('${employee.id}')"><i class="fa-solid fa-trash"></i>Delete</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        `;
    });
    table.innerHTML = rows;
    document.getElementById('totalItems').textContent = allDatas.length
}



//------------------------------------------------------------------add employeee popup--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


function showAddEmployeePopup(){

  let add = document.getElementById('add-employee')
  let overlay = document.getElementById('overlay')
  
  
   //Display the popup and overlay
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

  //-----------------------------------------------------------------UPLOADING IMAGE Adding-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let profilePic = document.getElementById('uploadimg');
let inputFile = document.getElementById('upload');  
validImage = false
inputFile.onchange = function (){            //any image execute tis function       
  profilePic.src = URL.createObjectURL(inputFile.files[0])
validImage = true
}

  //---------------------------------------------------------------adding-employee---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
async function postData() {

    const salutation = document.getElementById("salutation-name").value;
    const firstName = document.getElementById("first-name").value;
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

  try {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
  
    if (!response.ok) {
        throw new Error('Failed to add employee in backend');
    }

    const respData = await response.json();

    const inputFile = document.getElementById('upload');
    const formdata = new FormData();
    formdata.append("avatar", inputFile.files[0]);
   if(validImage){
    const avatarResponse = await fetch(`http://localhost:3000/employees/${respData.id}/avatar`, {
        method: "POST",
        body: formdata,
    });
   }

    newUser.id =respData.id
    allDatas.unshift(newUser);

    addTableShow(currentpage);
    console.log(allDatas);
} catch (error) {
    console.error('Error adding employee :', error);
}

 }
document.getElementById('addEmpbtn').addEventListener('click',(e)=>{
  e.preventDefault();
  const validation= addFormValidation ()
  if(!validation){
    return;
  }
  else{
    postData();
    closeAddEmployeePopup();
    swal.fire({
        title: "Successfully Added data",
        icon: "success",
      });
    resetvalue()

  }
 

})

function resetvalue(){
  document.getElementById('uploadimg').src='default-avatar.jpeg';
  document.getElementById("salutation-name").value='';
    document.getElementById("first-name").value='';
    document.getElementById("las-nme").value='';
   document.getElementById("exampleInputEmail1").value='';
    document.getElementById("typePhone").value=''
     document.getElementById("qual-nme").value='';
    document.getElementById("address").value='';
   document.getElementById("cit-nme").value='';
    document.getElementById("ste-nme").value='';  
    document.getElementById("coun-nme").value='';
    document.getElementById("date").value='';
    document.getElementById("pin-zip").value='';
    document.getElementById("maleCheck").checked='';
    document.getElementById("femaleCheck").checked='';
     document.getElementById("user").value='';
    document.getElementById("pass").value='';

}

// --------------------------------------------------------validation add-form----------------------------------------------------------------------------------------------------------------------------------------
const addFormValidation = () => {
  const firstNameVal = document.getElementById("first-name");
  const lastNameVal = document.getElementById("las-nme");
  const salutationVal = document.getElementById("salutation-name");
  const emailVal = document.getElementById("exampleInputEmail1");
  const phoneVal = document.getElementById("typePhone");
  const qualificationVal = document.getElementById("qual-nme");
  const addressVal = document.getElementById("address");
  const dobVal = document.getElementById("date");
  const cityVal = document.getElementById("cit-nme");
  const stateVal = document.getElementById("ste-nme");
  const countryVal = document.getElementById("coun-nme");
  const pinVal = document.getElementById("pin-zip");
  const usernameVal = document.getElementById("user");
  const passwordVal = document.getElementById("pass");
  const maleval = document.getElementById("maleCheck");
  const femaleval = document.getElementById("femaleCheck");

  const setValidationMessage = (elementId, message) => {
      const element = document.getElementById(elementId);
      if (element) {
          element.textContent = message;
      }
  };

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10}$/;
  const namePattern = /^[a-zA-Z]+$/;
  const passwordPattern = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}");

  salutationVal.addEventListener('input', () => {
      setValidationMessage('salutation-Validate', '');
      if (salutationVal.value === '') {
          setValidationMessage('salutation-Validate', 'Select a salutation');
      }
  });

  firstNameVal.addEventListener('input', () => {
      setValidationMessage('firstName-Val', '');
      if (!namePattern.test(firstNameVal.value)) {
          setValidationMessage('firstName-Val', 'Enter valid first name');
      }
  });

  lastNameVal.addEventListener('input', () => {
      setValidationMessage('lastName-Validate', '');
      if (!namePattern.test(lastNameVal.value)) {
          setValidationMessage('lastName-Validate', 'Enter valid last name');
      }
  });

  emailVal.addEventListener('input', () => {
      setValidationMessage('email-Val', '');
      if (!emailPattern.test(emailVal.value)) {
          setValidationMessage('email-Val', 'Enter a valid email id');
      }
  });

  phoneVal.addEventListener('input', () => {
      setValidationMessage('phone-Val', '');
      if (!phonePattern.test(phoneVal.value)) {
          setValidationMessage('phone-Val', 'Phone number should be 10 digits');
      }
  });

  qualificationVal.addEventListener('input', () => {
      setValidationMessage('qualifications-Validate', '');
      if (qualificationVal.value === '') {
          setValidationMessage('qualifications-Validate', 'Qualification is required');
      }
  });

  addressVal.addEventListener('input', () => {
      setValidationMessage('address-Validate', '');
      if (addressVal.value === '') {
          setValidationMessage('address-Validate', 'Address is required');
      }
  });

  dobVal.addEventListener('input', () => {
      setValidationMessage('dobValidate', '');
      if (dobVal.value === '') {
          setValidationMessage('dobValidate', 'DOB is required');
      }
  });

  cityVal.addEventListener('input', () => {
      setValidationMessage('city-Validate', '');
      if (cityVal.value === '') {
          setValidationMessage('city-Validate', 'City is required');
      }
  });

  stateVal.addEventListener('input', () => {
      setValidationMessage('state-Validate', '');
      if (stateVal.value === '') {
          setValidationMessage('state-Validate', 'Select a state');
      }
  });

  countryVal.addEventListener('input', () => {
      setValidationMessage('country-Validate', '');
      if (countryVal.value === '') {
          setValidationMessage('country-Validate', 'Select a country');
      }
  });

  pinVal.addEventListener('input', () => {
      setValidationMessage('pin-Validate', '');
      if (pinVal.value === '') {
          setValidationMessage('pin-Validate', 'Pin is required');
      }
  });

  usernameVal.addEventListener('input', () => {
      setValidationMessage('username-Validate', '');
      if (usernameVal.value === '') {
          setValidationMessage('username-Validate', 'Username is required');
      }
  });

  document.getElementById("add-employee").addEventListener("input", () => {
      if (maleval.checked || femaleval.checked) {
          document.getElementById('gendervalidate').innerText = ``
      }
  });

  passwordVal.addEventListener('input', () => {
      setValidationMessage('password-Validate', '');
      if (!passwordPattern.test(passwordVal.value)) {
          setValidationMessage('password-Validate', 'Password should contain at least 8 characters with number, symbol, capital, and small letters');
      }
  });

  const validateForm = () => {
      let isValid = true;
      const gender = document.querySelector('input[name="Gender"]:checked');
      const dobValue = dobVal.value.trim();

      if (!gender) {
          setValidationMessage("gendervalidate", 'Please select a gender');
          isValid = false;
      }

      if (dobValue === '') {
          setValidationMessage("dobValidate", 'Please select date of birth');
          isValid = false;
      }

      if (!phonePattern.test(phoneVal.value.trim())) {
          setValidationMessage("phone-Val", 'Phone number should be 10 digits');
          isValid = false;
      }

      if (!emailPattern.test(emailVal.value.trim())) {
          setValidationMessage("email-Val", 'Please enter a valid email id');
          isValid = false;
      }

      if (!namePattern.test(firstNameVal.value.trim())) {
          setValidationMessage("firstName-Val", 'Enter valid first name');
          isValid = false;
      }

      if (!namePattern.test(lastNameVal.value.trim())) {
          setValidationMessage("lastName-Validate", 'Enter valid last name');
          isValid = false;
      }

      if (!passwordPattern.test(passwordVal.value.trim())) {
          setValidationMessage("password-Validate", 'Password should contain at least 8 characters with number, symbol, capital, and small letters');
          isValid = false;
      }

      if (salutationVal.value.trim() === '') {
          setValidationMessage("salutation-Validate", 'Please select a salutation');
          isValid = false;
      }

      if (usernameVal.value.trim() === '') {
          setValidationMessage("username-Validate", 'Enter a username');
          isValid = false;
      }

      if (qualificationVal.value.trim() === '') {
          setValidationMessage("qualifications-Validate", 'Enter qualification');
          isValid = false;
      }

      if (addressVal.value.trim() === '') {
          setValidationMessage("address-Validate", 'Enter address');
          isValid = false;
      }

      if (stateVal.value.trim() === '') {
          setValidationMessage("state-Validate", 'Select a state');
          isValid = false;
      }

      if (countryVal.value.trim() === '') {
          setValidationMessage("country-Validate", 'Select a country');
          isValid = false;
      }

      if (cityVal.value.trim() === '') {
          setValidationMessage("city-Validate", 'Enter city');
          isValid = false;
      }

      if (pinVal.value.trim() === '') {
          setValidationMessage("pin-Validate", 'Enter Pin/Zip code');
          isValid = false;
      }

      return isValid;
  };

  return validateForm();
}



//----------------------------------------------------------------Delete Employee popup-----------------------------------------------------------------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------delete Employeee--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


 function delEmployee(id) {

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
   
  // Remove the deleted employee from the data array
 allDatas = allDatas.filter(emp => emp.id !== id);

 swal.fire({
    title: "Successfully deleted data",
    icon: "success",
  });

 addTableShow(currentpage)

 closedelpopup() 
console.log(allDatas)

}

}

//----------------------------------------------edit employee popup---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function editemployeepop ()  {
  const edit = document.getElementById("editemployee");
  const overlay = document.getElementById("overlay");

  // Display the popup and overlay
  edit.style.display = "block";
  overlay.style.display = "block";
}
function closeeditpop() {
  const closeEmployeepop = document.getElementById("editemployee");
  const overlay = document.getElementById("overlay");


  // Close the popup and overlay
  closeEmployeepop.style.display = "none";
  overlay.style.display = "none";
  
}


  
//-------------------------------------------------------------Editing upload image--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Image preview functionality

let editpic = document.getElementById('editimage');
let editInputFile = document.getElementById('input-editfile');

editInputFile.onchange = function() {
    editpic.src = URL.createObjectURL(editInputFile.files[0]);
};

async function editEmployee(id) {
    editemployeepop(); // Show the popup

    try {
        const response = await fetch(`http://localhost:3000/employees/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch employee data for editing');
        }
        const employeeData = await response.json();
        console.log('employeeData', employeeData);
        console.log(employeeData.state);

        // Populate the edit form fields with the fetched employee data
        document.getElementById('editimage').src = `http://localhost:3000/employees/${id}/avatar`;
        document.getElementById("saleditnme").value = employeeData.salutation;
        document.getElementById("firsteditnme").value = employeeData.firstName;
        document.getElementById("laseditnme").value = employeeData.lastName;
        document.getElementById("exampleInputEmail1sedit").value = employeeData.email;
        document.getElementById("typePhoneededit").value = employeeData.phone;
        document.getElementById("qualeditnme").value = employeeData.qualifications;
        document.getElementById("addressedit").value = employeeData.address;
        document.getElementById("citnmeedit").value = employeeData.city;
        document.getElementById("stenmeedit").value = employeeData.state;
        document.getElementById("counnmeedit").value = employeeData.country;
        document.getElementById("editdateedit").value = employeeData.dob.split("-").reverse().join("-");
        document.getElementById("pinzipedit").value = employeeData.pin;
        document.getElementById("maleCheckedit").checked = employeeData.gender === "male";
        document.getElementById("femaleradioedit").checked = employeeData.gender === "female";
        document.getElementById("useredit").value = employeeData.username;
        document.getElementById("passedit").value = employeeData.password;

        // Remove existing event listeners from the submit button
        const submitEditBtn = document.getElementById("submitEditBtn");
        const newSubmitEditBtn = submitEditBtn.cloneNode(true);
        submitEditBtn.parentNode.replaceChild(newSubmitEditBtn, submitEditBtn);

        // Add event listener to the new submit button  
        newSubmitEditBtn.addEventListener('click', async function(e) {
            e.preventDefault();

            // Gather updated data from the form
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

                // Update avatar if a new file is selected
                if (editInputFile.files.length > 0) {
                    const formData = new FormData();
                    formData.append("avatar", editInputFile.files[0]);

                    const avatarResponse = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
                        method: "POST",
                        body: formData,
                    });

                    if (!avatarResponse.ok) {
                        throw new Error('Failed to upload avatar for employee');
                    }
                }

                // Ensure allDatas is an array
                if (!Array.isArray(allDatas)) {
                    throw new TypeError('allDatas is not an array');
                }

                // Update the allDatas array with the updated employee data
                updatedUser.id = id;
                const userIndex = allDatas.findIndex(user => user.id === id);
                if (userIndex !== -1) {
                    allDatas.splice(userIndex, 1, updatedUser);
                }
                closeeditpop();
                addTableShow(currentpage);
                
            } catch (error) {
                console.error('Error updating employee:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error updating employee data. Please try again.',
                    icon: 'error',
                });
            }
        });
    } catch (error) {
        console.error('Error fetching data for editing:', error);
        Swal.fire({
            title: 'Error',
            text: 'Error fetching employee data. Please check your network connection and try again.',
            icon: 'error',
        });
    }
}



// ---------------------------------------pagination-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// Pagination function
function pagination() {
    let totalPages = Math.ceil(allDatas.length / employeesPerPage);
    paginationList.innerHTML = '';

    // Helper function to create and append buttons
    function createButton(text, isEnabled, clickHandler) {
        const button = document.createElement("li");
        button.classList.add("page-item");
        button.innerHTML = `<a class="page-link">${text}</a>`;
        if (isEnabled) {
            button.addEventListener("click", clickHandler);
        }
        paginationList.appendChild(button);
    }

    // Always show first and previous buttons
    createButton("<<", currentpage > 1, () => {
        currentpage = 1;
        addTableShow(currentpage);
        pagination();
    });

    createButton("<", currentpage > 1, () => {
        currentpage--;
        addTableShow(currentpage);
        pagination();
    });

    // Calculate start and end pages for the current pagination view
    let startPage = Math.max(currentpage - 1, 1);
    let endPage = Math.min(currentpage + 1, totalPages);

    if (currentpage === 1) {
        endPage = Math.min(currentpage + 2, totalPages);
    } else if (currentpage === totalPages) {
        startPage = Math.max(currentpage - 2, 1);
    }

    // Create page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("li");
        pageButton.classList.add("page-item");
        pageButton.innerHTML = `<a class="page-link">${i}</a>`;
        if (i === currentpage) {
            pageButton.classList.add("active");
    
        }
        pageButton.addEventListener("click", () => {
            currentpage = i;
            addTableShow(currentpage);
            pagination();
        });
        paginationList.appendChild(pageButton);
    }

    // Always show next and last buttons
    createButton(">", currentpage < totalPages, () => {
        currentpage++;
        addTableShow(currentpage);
        pagination();
    });

    createButton(">>", currentpage < totalPages, () => {
        currentpage = totalPages;
        addTableShow(currentpage);
        pagination();
    });
}

// Search functionality
const searchInput = document.getElementById('srch');
searchInput.addEventListener('input', (event) => {
    const searchValue = event.target.value.trim().toLowerCase();

    allDatas = empDatas;
    if (searchValue !== '') {
        allDatas = allDatas.filter(employee => {
            return (
                employee.firstName.toLowerCase().includes(searchValue) ||
                employee.email.toLowerCase().includes(searchValue) ||
                employee.phone.toLowerCase().includes(searchValue)
            );
        });
    }
    console.log(allDatas);
    addTableShow(currentpage);
    pagination();
});
