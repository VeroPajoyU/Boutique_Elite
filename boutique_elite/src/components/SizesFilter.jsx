import { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';

function SizesFilter({ sizes, onSizesSelect }) {
const [selectedSizes, setSelectedSizes] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const sizesPerColumn = Math.ceil(sizes.length / 2);
  const sizesColumn1 = sizes.slice(0, sizesPerColumn);
  const sizesColumn2 = sizes.slice(sizesPerColumn);

  const handleSizeSelect = useCallback((sizeId, column) => {
    const isSelected = selectedSizes.includes(sizeId);
    const newSelectedSizes = [...selectedSizes];

    if (isSelected) {
      newSelectedSizes.splice(newSelectedSizes.indexOf(sizeId), 1);
    } else {
      newSelectedSizes.push(sizeId);
    }

    if (newSelectedSizes.length === sizes.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }

    setSelectedSizes(newSelectedSizes);
  }, [selectedSizes, sizes]);

  const handleAllSelect = useCallback((event) => {
    setIsAllSelected(event.target.checked);
    if (event.target.checked) {
      setSelectedSizes(sizes.map((size) => size.id));
    } else {
      setSelectedSizes([]);
    }
  }, [sizes]);

  const handleApply = useCallback((event) => {
    event.preventDefault();
    onSizesSelect(selectedSizes);
  }, [selectedSizes, onSizesSelect]);

  return (
    <div className='container mt-4 accordion'>
      <div className='accordion-item'>
        <Form onSubmit={handleApply}>
          <div className="text-center mt-3">
            <h5><Form.Label>Tallas</Form.Label></h5>
          </div>
          <div className="accordion-body m-1" style={{ overflowY: "auto", maxHeight: "135px"}}>
            <div className="row">
              <div>
                <Form.Check
                  key={"all-column1"}
                  type="checkbox"
                  name="size"
                  value={"all"}
                  label={"Todas"}
                  checked={isAllSelected}
                  onChange={(event) => handleAllSelect(event)}
                />
              </div>
              <hr className="my-2" />
              <div className="col">                
                {sizesColumn1.map((size) => (
                  <Form.Check
                    key={size.id}
                    type="checkbox"
                    name="size"
                    value={size.id}
                    label={size.size}
                    checked={selectedSizes.includes(size.id)}
                    onChange={() => handleSizeSelect(size.id, sizes)}
                  />
                ))}
              </div>
              <div className="col">
                {sizesColumn2.map((size) => (
                  <Form.Check
                    key={size.id}
                    type="checkbox"
                    name="size"
                    value={size.id}
                    label={size.size}
                    checked={selectedSizes.includes(size.id)}
                    onChange={() => handleSizeSelect(size.id, sizes)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="text-center m-3">
            <button type='submit' className="btn btn-primary">Aplicar</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SizesFilter;