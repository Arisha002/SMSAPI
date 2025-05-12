const employee_API_LINK = "https://congenial-memory-q765wgppx7x9f6wwj-5001.app.github.dev/employees";
const regions_API_LINK = "https://congenial-memory-q765wgppx7x9f6wwj-5001.app.github.dev/regions";
const jobs_API_LINK = "https://congenial-memory-q765wgppx7x9f6wwj-5001.app.github.dev/jobs1";


fetch(employee_API_LINK).then(response=>{
    if(!response.ok)
        throw new Error("Failed to fetch data");
    return response.json();
}).then(data => {
  
    const tbody = document.querySelector("#Cemployees");
    
    data.forEach(employee1=>{
        const row = document.createElement("employee-container");

        row.innerHTML=`
        <a href=" https://congenial-memory-q765wgppx7x9f6wwj-5001.app.github.dev/employees"><p>Count : ${employee1.count}</a></p>
        `;
      
        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});




fetch(regions_API_LINK).then(response=>{
    if(!response.ok)
        throw new Error("Failed to fetch data");
    return response.json();
}).then(data => {
  
    const tbody = document.querySelector("#Cregions");
    
    data.forEach(regions=>{
        const row = document.createElement("regions-container");

        row.innerHTML=`
        <p>Count : ${regions.count}</p>
        `;
      
        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});



fetch(jobs_API_LINK).then(response=>{
    if(!response.ok)
        throw new Error("Failed to fetch data");
    return response.json();
}).then(data => {
  
    const tbody = document.querySelector("#Cjobs");
    
    data.forEach(jobs=>{
        const row = document.createElement("jobs-container");

        row.innerHTML=`
        <p>Count : ${jobs.count}</p>
        `;
      
        tbody.appendChild(row);
    });

}).catch(err=>{
    console.log(err.message);
});