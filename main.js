function showData(){
    var request=new XMLHttpRequest();
    request.open("GET","http://localhost:5000/show",true);
    var html="";
    var NumberOfEmployee=1;
    request.send();
    request.onload=()=>{
       data=JSON.parse(request.responseText);
       data.forEach(element => {
            html="<tr>"+"<th scope='row'>"+NumberOfEmployee+"</th>"
            +"<td>"+element.id+"</td>"
            +"<td>"+element.first_name+"</td>"+
            "<td>"+element.last_name+"</td>"+
            "<td>"+element.salary+"</td>"+
            "<td>"+"<button class='btn btn-danger' id='delete-button' onclick=deleteUsingId(`"+element.id+"`)>"+"delete"+"</button>"+
            "<button class='btn btn-warning ml-2' id='edit-button' onclick=editUsingId(`"+element.id+"`)>"+"edit"+"</button>"+"</td>"+
            "</tr>";
            NumberOfEmployee++;
            document.getElementById("table-body").innerHTML+=html;
       });
    }
}
function valider(){
    var id=crypto.randomUUID();
    var firstName=document.getElementById("firstName").value;
    var secondName=document.getElementById("secondName").value;
    var email=document.getElementById("email").value;
    var phoneNumber=document.getElementById("phoneNumber").value;
    var organization=document.getElementById("organization").value;
    var designation=document.getElementById("designation").value;
    var salary=document.getElementById("salary").value;
    var getRequest=new XMLHttpRequest();
    var test=true;
    if(firstName==""){
        test=false;
        document.getElementById("first-error").style.color="red";
        document.getElementById("first-error").style.fontSize="12px";
        document.getElementById("first-error").innerText="first name is not valid";

    }
    if(secondName==""){
        test=false;
        document.getElementById("second-error").style.color="red";
        document.getElementById("second-error").style.fontSize="12px";
        document.getElementById("second-error").innerText="last name is not valid";
    }
    if(email==""){
        test=false;
        document.getElementById("email-error").style.color="red";
        document.getElementById("email-error").style.fontSize="12px";
        document.getElementById("email-error").innerText="email is not valid";
    }
    if(phoneNumber==""){
        test=false;
        document.getElementById("phone-error").style.color="red";
        document.getElementById("phone-error").style.fontSize="12px";
        document.getElementById("phone-error").innerText="phone is not valid";
    }
    if(organization==""){
        test=false;
        document.getElementById("organization-error").style.color="red";
        document.getElementById("organization-error").style.fontSize="12px";
        document.getElementById("organization-error").innerText="organization is not valid";
    }
    if(designation==""){
        test=false;
        document.getElementById("designation-error").style.color="red";
        document.getElementById("designation-error").style.fontSize="12px";
        document.getElementById("designation-error").innerText="designation is not valid";
    }
    if(salary==""){
        test=false;
        document.getElementById("salary-error").style.color="red";
        document.getElementById("salary-error").style.fontSize="12px";
        document.getElementById("salary-error").innerText="salary is not valid";
    }

    if(test==true){
        const data=JSON.stringify({
            id:id,
            first_name:firstName,
            last_name:secondName,
            email:email,
            phone:phoneNumber,
            organization:organization,
            designation:designation,
            salary:salary


        })
        postRequest=new XMLHttpRequest();
        postRequest.open("POST","http://localhost:5000/add");
        postRequest.setRequestHeader('content-type','application/json');
        postRequest.send(data);
        successMessage=document.getElementById("successMessage");
        div=document.createElement("div");
        div.className="alert alert-success";
        div.textContent="added employee successfully";
        div.setAttribute("role","alert");
        successMessage.append(div);
        setTimeout(()=>{
            successMessage.removeChild(successMessage.childNodes[0]);
        },2000)
        const errorElements = document.querySelectorAll(`[id$="${'error'}"]`);
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].innerText="";
        }
        document.getElementById("form").reset();
        
    }
}
function deleteUsingId(id){
    deleteRequest=new XMLHttpRequest();
    deleteRequest.open("DELETE","http://localhost:5000/remove"+id,true);
    deleteRequest.send();
    deleteRequest.onreadystatechange=function(){
            if(deleteRequest.readyState===4){
                var parentNode=document.getElementById("data-table");
                var new_tbody = document.createElement('tbody');
                new_tbody.setAttribute("id","table-body")
                var old_tbody=document.getElementById("table-body");
                parentNode.replaceChild(new_tbody,old_tbody);
                showData();
            }
        
    }
    
}
function editUsingId(id){

}
function findUsingName(){
   first_name=document.getElementById("search-area").value;
   if(first_name!=""){
        getRequest=new XMLHttpRequest();
        getRequest.open("GET","http://localhost:5000/find"+first_name,true);
        getRequest.send();
        var html="";
        var NumberOfEmployee=1;
        document.getElementById('table-body').innerHTML="";
        getRequest.onload=()=>{
        data=JSON.parse(getRequest.responseText);
        data.forEach(element => {
                html="<tr>"+"<th scope='row'>"+NumberOfEmployee+"</th>"
                +"<td>"+element.id+"</td>"
                +"<td>"+element.first_name+"</td>"+
                "<td>"+element.last_name+"</td>"+
                "<td>"+element.salary+"</td>"+
                "</tr>";
                NumberOfEmployee++;
                document.getElementById("table-body").innerHTML+=html;
        });
        }
    }else{
        document.getElementById('table-body').innerHTML="";
    }
    
}
