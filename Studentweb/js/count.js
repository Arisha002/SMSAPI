const employee_API_LINK = "https://congenial-memory-q765wgppx7x9f6wwj-5001.app.github.dev/employees";

fetch(employee_API_LINK).then(response=>{
    if(!response.ok)
        throw new Error("Failed to fetch data");
    return response.json();
}).then(data=>{
  
    const tbody = document.querySelector("#Cemployees");
    
    data.forEach(job=>{
        const row = document.createElement("employee-count");

        row.innerHTML=`
        <p>Count : ${job.count}</p>
        `;
      
        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});