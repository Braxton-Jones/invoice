export default function FilterSelect(props) {
  function toggleCheckboxes(status) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Check if none of the checkboxes are selected
    const noneSelected = Array.from(checkboxes).every(
      (checkbox) => !checkbox.checked
    );

    if (noneSelected) {
      props.setFilterStatus('all');
    } else {
      props.setFilterStatus(status);
    }

    checkboxes.forEach((checkbox) => {
      if (checkbox.id !== status) {
        checkbox.checked = false;
      }
    });
  }
  return (
    <div className='filter-select' value='filter-status'>
      <label htmlFor='checkbox1'>
        <input
          type='checkbox'
          id='draft'
          name='checkboxGroup'
          onChange={() => {
            toggleCheckboxes('draft')
            props.toggleFilterModal()
          }
          }
        />
        <span className='custom-checkbox-label'> Draft</span>
      </label>
      <br />
      <label htmlFor='checkbox2'>
        <input
          type='checkbox'
          id='pending'
          name='checkboxGroup'
          onChange={() => {
            toggleCheckboxes('pending')
            props.toggleFilterModal()
          }}
        />{' '}
        <span className='custom-checkbox-label'>Pending</span>
      </label>
      <br />
      <label htmlFor='checkbox3'>
        <input
          type='checkbox'
          id='paid'
          name='checkboxGroup'
          onChange={() => {
            toggleCheckboxes('paid')
            props.toggleFilterModal()
          }}
        />{' '}
        <span className='custom-checkbox-label'>Paid</span>
      </label>
      <br />
    </div>
  );
}
