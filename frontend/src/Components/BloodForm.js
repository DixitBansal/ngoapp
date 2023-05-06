import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Blood.css'

function BloodForm() {
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
  });
 
  const navigate = useNavigate();

  useEffect(() => {
    const storedCheckboxes = JSON.parse(localStorage.getItem('checkboxes'));
    if (storedCheckboxes) {
      setCheckboxes(storedCheckboxes);
    }
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    localStorage.setItem('Blood', JSON.stringify(checkboxes));
  }, [checkboxes]);

  const submitHandle = ()=> {
    navigate("/ViewHospital")
  }

  return (
    <>

    <h1 className='h1'>Add Blood Group</h1>
    <form>
      <div className="for">

      <div className="opt1">
    <div className="row1">

      <label>
        <input className='inp1 inputinput'
          type="checkbox"
          name="option1"
          checked={checkboxes.option1}
          onChange={handleCheckboxChange}
          />
        <h1>A+</h1>
      </label>
          </div>
      <br />
      <div className="row1">

      <label>
        <input className='inp2 inputinput'
          type="checkbox"
          name="option2"
          checked={checkboxes.option2}
          onChange={handleCheckboxChange}
          />
          <h1>B-</h1>
      </label>
          </div>
      <br />
      <div className="row1">

      <label>
        <input className='inp3 inputinput'
          type="checkbox"
          name="option3"
          checked={checkboxes.option3}
          onChange={handleCheckboxChange}
          />
        <h1>AB</h1>
      </label>
          </div>
          </div>
      <br />
      <div className="opt1">
    <div className="row1">

      <label>
        <input className='inp4 inputinput'
          type="checkbox"
          name="option4"
          checked={checkboxes.option4}
          onChange={handleCheckboxChange}
          />
        <h1>A+</h1>
      </label>
          </div>
      <br />
      <div className="row1">

      <label>
        <input className='inp5 inputinput'
          type="checkbox"
          name="option5"
          checked={checkboxes.option5}
          onChange={handleCheckboxChange}
          />
          <h1>B-</h1>
      </label>
          </div>
      <br />
      <div className="row1">

      <label>
        <input className='inp6 inputinput'
          type="checkbox"
          name="option6"
          checked={checkboxes.option6}
          onChange={handleCheckboxChange}
          />
        <h1>AB</h1>
      </label>
          </div>
          </div>
          </div>
          <div className="btn">

      <button onClick={submitHandle}> Submit </button>
          </div>
    </form>

    </>
  );
}

export default BloodForm;
