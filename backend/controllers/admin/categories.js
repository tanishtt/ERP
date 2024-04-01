const connection = require('../../connection/connection');



async function handleAddCategories(req, res) {
    try {
        const { category_name } = req.body;

        const query = 'INSERT INTO categories (category_name) VALUES (?)';
        const values = [category_name];
        await connection.query(query, values);

        res.status(200).json({ message: 'Category added successfully.' });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



async function handleDeleteCategories(req, res) {
    try {
        const category_id = req.params.category_id; 
        const query = 'DELETE FROM categories WHERE category_id=?';
        await connection.query(query, [category_id]);

        
        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function handleCategoryDropDown(req, res){
const sql = 'SELECT category_id, category_name FROM categories';

  // Execute the query
  connection.query(sql, (error, results) => {
    if (error) {
      // Handle error
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send the results back as JSON response
    res.status(200).json(results);
  });
}
module.exports = {
    handleAddCategories,
    handleDeleteCategories,
    handleCategoryDropDown
};
