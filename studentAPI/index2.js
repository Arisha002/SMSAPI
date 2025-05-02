const express = require('express');
const cors = require ('cors')
const pool = require('./db')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json("WELCOME TO STUDENT API")
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/students',async(req,res)=>{
    try{
        const result = await pool.query('select * from student');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/gettotalstd',async(req,res)=>{
    try{
        const result = await pool.query('select count(ID) from student');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/job_employee_countrydetails',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name,e.last_name,jh.start_date,jh.end_date,j.job_id,j,job_title,l.location_id,c.country_id from employees e join job_history jh on e.employee_id=jh.employee_id join jobs j on jh.job_id=j.job_id join departments d on e.department_id=d.department_id join locations l on l.location_id=d.location_id join countries c on c.country_id=l.country_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/regions_locations_countrydetails',async(req,res)=>{
    try{
        const result = await pool.query('select r.region_name,r.region_id,l.location_id,c.country_id from regions r join countries c on r.region_id=c.region_id join locations l on l.country_id=c.country_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/countrydetails_regions_locations',async(req,res)=>{
    try{
        const result = await pool.query('select r.region_name,r.region_id,l.location_id,c.country_id from countries c  join regions r on r.region_id=c.region_id join locations l on l.country_id=c.country_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/locations_countrydetails_regions',async(req,res)=>{
    try{
        const result = await pool.query('select l.location_id,c.country_id,r.region_name,r.region_id from locations l  join countries c on l.country_id=c.country_id join regions r on c.region_id=r.region_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/department_employeedetails_locations',async(req,res)=>{
    try{
        const result = await pool.query('select  d.department_id,d.department_name,e.first_name,e.last_name,l.location_id from employees e join departments d on e.department_id=d.department_id  join locations l  on d.location_id=l.location_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});



app.get('/employees_departmentdetails_locations_countries',async(req,res)=>{
    try{
        const result = await pool.query('select d.department_id,d.department_name,e.first_name,e.last_name,l.location_id,c.country_id,c.country_name from employees e join departments d on e.department_id=d.department_id  join locations l  on d.location_id=l.location_id  join countries c on l.country_id=c.country_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/manager_departmentdetails_locations',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id,e.manager_id,m.employee_id as "m.id" ,d.department_id,d.department_name,l.location_id from employees e join employees m on e.manager_id= m.employee_id  join departments d  on e.department_id=d.department_id  join locations l  on l.location_id=d.location_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/job_title_departmentdetails_locations',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name,e.last_name,j.job_title ,d.department_id,d.department_name,l.location_id from employees e join  departments d  on e.department_id=d.department_id  join locations l  on l.location_id=d.location_id join jobs j on e.job_id=j.job_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/employees_job_title_departmentdetails_managers',async(req,res)=>{
    try{
        const result = await pool.query('select  e.employee_id,e.manager_id,m.employee_id as "m.id",d.department_id,d.department_name,j.job_title  from employees e  join employees m on e.manager_id= m.employee_id join departments d  on e.department_id=d.department_id  join jobs j on e.job_id=j.job_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/employees_job_title_departmentdetails_managers_locations',async(req,res)=>{
    try{
        const result = await pool.query('select  e.employee_id,e.manager_id,m.employee_id as "m.id",d.department_id,d.department_name,j.job_title,l.location_id  from employees e  join employees m on e.manager_id= m.employee_id join departments d  on e.department_id=d.department_id  join jobs j on e.job_id=j.job_id  join locations l  on l.location_id=d.location_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/name_of_countries',async(req,res)=>{
    try{
        const result = await pool.query('select country_name from countries where r.region_id=1');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});



app.get('/q61',async(req,res)=>{
    try{
        const result = await pool.query(`select d.department_name from departments d
        join locations l on l.location_id=d.location_id where l.city LIKE 'N%' `);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});



app.get('/employees_commission_pct',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name,e.last_name from employees e join departments d on e.department_id=d.department_id join employees m on d.manager_id=m.employee_id where m.commission_pct > 0.15');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/job_titles_manager',async(req,res)=>{
    try{
        const result = await pool.query(`select distinct job_title from jobs where job_title like '%Manager%' `);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});




app.get('/postal_codes',async(req,res)=>{
    try{
        const result = await pool.query(`select l.postal_code from locations l join countries c on l.country_id=c.country_id join regions r on c.region_id=r.region_id where r.region_name = 'Asia' `);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/name_of_departments',async(req,res)=>{
    try{
        const result = await pool.query('select d.department_name from employees e join departments d on e.department_id=d.department_id where e.commission_pct < (Select avg(commission_pct) from employees) group by d.department_name');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});



app.get('/job_title_salary',async(req,res)=>{
    try{
        const result = await pool.query('select j.job_title from jobs j join employees e on e.job_id=j.job_id where salary > (Select avg(salary) from employees e2 where e2.department_id=e.department_id)');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/employee_department',async(req,res)=>{
    try{
        const result = await pool.query('select employee_id from employees where department_id is null');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});



app.get('/name_of_employees_jobs',async(req,res)=>{
    try{
        const result = await pool.query('select count(*),e.first_name from employees e join job_history jh on jh.employee_id=e.employee_id group by e.employee_id having count(*) > 1');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/department_id_count',async(req,res)=>{
    try{
        const result = await pool.query('select department_id,count(*) from employees group by department_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/total_salary',async(req,res)=>{
    try{
        const result = await pool.query('select job_title,sum(max_salary) as "max",sum(min_salary) as"min" from jobs group by job_title');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/avg_commission_pct',async(req,res)=>{
    try{
        const result = await pool.query('select count(*),department_id,avg(commission_pct) from employees group by department_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/max_salary_country',async(req,res)=>{
    try{
        const result = await pool.query('select count(*),c.country_id,max(salary) from employees e join jobs j on j.job_id=e.job_id join departments d on e.department_id=d.department_id join locations l on l.location_id=d.location_id join countries c on c.country_id=l.country_id group by c.country_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/department_city_stateprovince',async(req,res)=>{
    try{
        const result = await pool.query(`select e.first_name,e.last_name,d.department_id,d.department_name,l.city,l.state_province from employees e join departments d  on e.department_id=d.department_id join locations l on l.location_id=d.location_id where e.first_name like '%z%' `);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/jobs_starting_ending',async(req,res)=>{
    try{
        const result = await pool.query(`select j.job_title, d.department_name, e.first_name || ' ' || e.last_name as "full_name" from employees e join departments d on e.department_id=d.department_id join jobs j on e.job_id=j.job_id join job_history jh on e.employee_id=jh.employee_id where jh.start_date >= '1993-01-01' and jh.end_date <= '1997-08-31'`);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/name_countries_city_department',async(req,res)=>{
    try{
        const result = await pool.query('select c.country_name,l.city,count(e.employee_id) from employees e join departments d on e.department_id=d.department_id join locations l on l.location_id=d.location_id join countries c on c.country_id=l.country_id group by c.country_name,l.city having count(e.employee_id) > 2');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/name_job_title',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name,e.last_name,j.job_title,jh.start_date,jh.end_date from employees e join jobs j on e.job_id=j.job_id join job_history jh on e.employee_id=jh.employee_id where jh.start_date = (select max(start_date) from job_history where employee_id=e.employee_id) and jh.end_date =(Select max(end_date) from job_history where employee_id=e.employee_id) and e.commission_pct is null');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/name_id',async(req,res)=>{
    try{
        const result = await pool.query('select e.employee_id,e.first_name,e.last_name ,c.country_id from employees e join departments d on e.department_id=d.department_id join locations l on d.location_id=d.location_id join countries c  on l.country_id=c.country_id');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/name_salary_department_id',async(req,res)=>{
    try{
        const result = await pool.query('select e.first_name,e.last_name,e.salary,e.department_id from employees e where e.salary in (select min(salary) from employees group by department_id)');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});



app.get('/third_highest_sal',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees  where salary = (select min(salary) from (select distinct salary from employees order by salary desc limit 3) as "top_third")');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/j_name',async(req,res)=>{
    try{
        const result = await pool.query('select employee_id,first_name,last_name,salary from employees where salary > (select avg(salary) from employees) and department_id in (select distinct department_id from employees where first_name ILIKE \'%J%\' or last_name ILIKE \'%J%\')');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/city_toronto',async(req,res)=>{
    try{
        const result = await pool.query(`select e.first_name, e.last_name, e.employee_id, j.job_title from employees e join jobs j ON e.job_id = j.job_id join departments d ON e.department_id = d.department_id join locations l on d.location_id = l.location_id where l.city = 'Toronto'`);
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

const PORT = process.env.PORT;
app.listen(PORT,()=> {
    console.log(`Connected Successfully........Running on PORT ${PORT}`);
});