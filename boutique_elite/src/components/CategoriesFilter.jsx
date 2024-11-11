// CategoriesFilter.jsx --> Fila de checkbox para seleccionar categorías.
import { Form } from 'react-bootstrap';

const CategoriesFilter = ({ categories, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      onFilterChange(name, value, 'add');
    } else {
      onFilterChange(name, value, 'remove');
    }
  };

  return (
    <Form>
      <Form.Label>Categories</Form.Label>
      {categories.map((category) => (
        <Form.Check
          key={category.id}
          type="checkbox"
          name="category"
          value={category.id}
          label={category.category}
          onChange={handleChange}
        />
      ))}
    </Form>
  );
};

export default CategoriesFilter;