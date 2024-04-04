const connection= require('../../connection/connection');


async function getExpenditure(req, res){
    const sql = 'SELECT * FROM expenditures';

    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}




async function postExpenditure(req, res){
    const formData = req.body;
    const sql = 'INSERT INTO expenditures (category, name, date, description, amount, status, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [
        formData.category,
        formData.name,
        formData.date,
        formData.description,
        formData.amount,
        formData.status,
        formData.email
    ];

    connection.query(sql, values, (err, results) => {
        if (err) throw err;
        console.log('Form data inserted:', results);
        const sql2='SELECT * FROM expenditures WHERE expenditure_id=?';
        connection.query(sql2, [results.insertId], (err, results2) => {
            if (err) throw err;
            return res.json(results2);
        });
                    // res.send('Form data submitted successfully!');
    });
}



async function updateExpenditure(req, res){
    
    const expenditureId = req.params.expenditure_id;
    const updatedData = req.body;
    const sql = `UPDATE expenditures SET 
                    category = ?, 
                    name = ?, 
                    date = ?, 
                    description = ?, 
                    amount = ?, 
                    status = ?, 
                    email = ? 
                WHERE expenditure_id = ?`;
    const values = [
        updatedData.category,
        updatedData.name,
        updatedData.date,
        updatedData.description,
        updatedData.amount,
        updatedData.status,
        updatedData.email,
        expenditureId
    ];

    connection.query(sql, values, (err, results) => {
        if (err) throw err;
        console.log('Expenditure updated:', results);
        res.send('Expenditure updated successfully!');
    });
}




async function deleteExpenditure(req, res){
    const expenditureId = req.params.expenditure_id;
    const sql = 'DELETE FROM expenditures WHERE expenditure_id = ?';

    connection.query(sql, [expenditureId], (err, results) => {
        if (err) throw err;
        console.log('Expenditure deleted:', results);
        res.send('Expenditure deleted successfully!');
    });
}



module.exports={
    getExpenditure,
    postExpenditure,
    updateExpenditure,
    deleteExpenditure
}


