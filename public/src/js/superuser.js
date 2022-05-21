//dom elements

let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let cnfpassword = document.getElementById('cnfpassword');
var allFildes = document.getElementsByClassName('allfields')[0] //all fields are require

var formDiv =  document.getElementsByClassName('form')[0];//main form
var preview = document.getElementsByClassName('preview')[0];
var form =  document.forms[0];

allFildes.style.display = 'block';
formDiv.style.display = 'block';
preview.style.display = 'none';

form.onsubmit = (e)=>{

    e.preventDefault();

    if(fname.value.length < 3)
    {

        document.getElementById('f').style.display = 'block';
        return;
    }
    else if(lname.value.length < 3)
    {
        console.log(lname.value);
        document.getElementById('l').style.display = 'block';
        return;
    }
    else if(email.value.length < 13)
    {

        document.getElementById('e').style.display = 'block';
        return;
    }
    else if(password.value.length < 6)
    {

        document.getElementById('p').style.display = 'block';
        return;
    }
    else if(password.value != cnfpassword.value)
    {

        document.getElementById('cp').style.display = 'block';
        return;
    }
    else
    {
        Array.from(document.getElementsByTagName('span')).forEach(e=>{

            e.style.display = 'none';

            //show preview function
            showPreview(form,fname,lname,email);
        })
    }



}

//for the Image
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.getElementById('userimg')
            img.onload = () => {
                URL.revokeObjectURL(img.src);  // no longer needed, free memory
            }
  
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        }
    });
  });

  //function this will show priview

  function showPreview(obj,fname,lname,email)
  {

 
    allFildes.style.display = 'none';
    preview.style.display = 'block'
    formDiv.style.display = 'none';

    document.getElementsByClassName('fname')[0].innerText = fname.value
    document.getElementsByClassName('lname')[0].innerText = lname.value
    document.getElementsByClassName('email')[0].innerText = email.value


    document.getElementsByClassName('sub')[0].onclick = () =>{

        obj.submit();
    }

    document.getElementsByClassName('gb')[0].onclick = () => {

        allFildes.style.display = 'block';
        formDiv.style.display = 'block';
        preview.style.display = 'none';
    }


  }