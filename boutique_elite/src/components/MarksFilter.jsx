// MarksFilter.jsx --> Fila de checkbox para seleccionar marcas.
import { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';

function MarksFilter({ marks, onMarksSelect }) {
  const [selectedMarks, setSelectedMarks] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const marksPerColumn = Math.ceil(marks.length / 2);
  const marksColumn1 = marks.slice(0, marksPerColumn);
  const marksColumn2 = marks.slice(marksPerColumn);

  const handleMarkSelect = useCallback((markId, column) => {
    const isSelected = selectedMarks.includes(markId);
    const newSelectedMarks = [...selectedMarks];

    if (isSelected) {
      newSelectedMarks.splice(newSelectedMarks.indexOf(markId), 1);
    } else {
      newSelectedMarks.push(markId);
    }

    if (newSelectedMarks.length === marks.length) {
      setIsAllSelected(true);
    } else {
      setIsAllSelected(false);
    }

    setSelectedMarks(newSelectedMarks);
  }, [selectedMarks, marks]);

  const handleAllSelect = useCallback((event, column) => {
    setIsAllSelected(event.target.checked);
    if (event.target.checked) {
      setSelectedMarks(column.map((mark) => mark.id));
    } else {
      setSelectedMarks([]);
    }
  }, [marks]);

  const handleApply = useCallback((event) => {
    event.preventDefault();
    onMarksSelect(selectedMarks);
  }, [selectedMarks, onMarksSelect]);

  return (
    <div className='container mt-4 accordion'>
      <div className='accordion-item'>
        <Form onSubmit={handleApply}>
          <div className="text-center mt-2">
            <h5><Form.Label>Marcas</Form.Label></h5>
          </div>
          <div className="accordion-body m-1" style={{ overflowY: "auto", maxHeight: "135px" }}>
            <div className="row">
              <div>
                <Form.Check
                  key={"all-column1"}
                  type="checkbox"
                  name="mark"
                  value={"all"}
                  label={"Todas"}
                  checked={isAllSelected}
                  onChange={(event) => handleAllSelect(event, marks)}
                />
              </div>
              <hr className="my-2" />
              <div className="col">                
                {marksColumn1.map((mark) => (
                  <Form.Check
                    key={mark.id}
                    type="checkbox"
                    name="mark"
                    value={mark.id}
                    label={mark.mark}
                    checked={selectedMarks.includes(mark.id)}
                    onChange={() => handleMarkSelect(mark.id, marks)}
                  />
                ))}
              </div>
              <div className="col">
                {marksColumn2.map((mark) => (
                  <Form.Check
                    key={mark.id}
                    type="checkbox"
                    name="mark"
                    value={mark.id}
                    label={mark.mark}
                    checked={selectedMarks.includes(mark.id)}
                    onChange={() => handleMarkSelect(mark.id, marks)}
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

export default MarksFilter;