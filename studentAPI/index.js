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
app.get('/jobs',async(req,res)=>{
    try{
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
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
app.get('/employees',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from employees');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/locations',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from locations');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/regions',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from regions');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/countries',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from countries');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/jobs1',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from jobs');
        res.json(result.rows);
    }
    catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/job_history',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from job_history');
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
        const result = await pool.query('select c.country_name from countries c join regions r on c.region_id=r.region_id where r.region_id=1');
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