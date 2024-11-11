import { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';

function ColorsFilter({ colors, onColorsSelect }) {
  const [selectedColors, setSelectedColors] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const colorsPerColumn = Math.ceil(colors.length / 2);
  const colorsColumn1 = colors.slice(0, colorsPerColumn);
  const colorsColumn2 = colors.slice(colorsPerColumn);

  const handleColorSelect = useCallback((colorId, column) => {
    const isSelected = selectedColors.includes(colorId);
    const newSelectedColors = [...selectedColors];

    if (isSelected) {
      newSelectedColors.splice(newSelectedColors.indexOf(colorId), 1);
    } else {
      newSelectedColors.push(colorId);
    }

    if (newSelectedColors.length === colors.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }

    setSelectedColors(newSelectedColors);
  }, [selectedColors, colors]);

  const handleAllSelect = useCallback((event) => {
    setIsAllSelected(event.target.checked);
    if (event.target.checked) {
      setSelectedColors(colors.map((color) => color.id));
    } else {
      setSelectedColors([]);
    }
  }, [colors]);

  const handleApply = useCallback((event) => {
    event.preventDefault();
    onColorsSelect(selectedColors);
  }, [selectedColors, onColorsSelect]);

  return (
    <div className='container mt-4 accordion'>
      <div className='accordion-item'>
        <Form onSubmit={handleApply}>
          <div className="text-center mt-2">
            <h5><Form.Label>Colores</Form.Label></h5>
          </div>
          <div className="accordion-body m-1" style={{ overflowY: "auto", maxHeight: "135px" }}>
            <div className="row">
              <div>
                <Form.Check
                  key={"all-column1"}
                  type="checkbox"
                  name="color"
                  value={"all"}
                  label={"Todos"}
                  checked={isAllSelected}
                  onChange={(event) => handleAllSelect(event)}
                />
              </div>
              <hr className="my-2" />
              <div className="col">                
                {colorsColumn1.map((color) => (
                  <Form.Check
                    key={color.id}
                    type="checkbox"
                    name="color"
                    value={color.id}
                    label={color.color}
                    checked={selectedColors.includes(color.id)}
                    onChange={() => handleColorSelect(color.id, colors)}
                  />
                ))}
              </div>
              <div className="col">
                {colorsColumn2.map((color) => (
                  <Form.Check
                    key={color.id}
                    type="checkbox"
                    name="color"
                    value={color.id}
                    label={color.color}
                    checked={selectedColors.includes(color.id)}
                    onChange={() => handleColorSelect(color.id, colors)}
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

export default ColorsFilter;