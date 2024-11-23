import React from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids/src'

import { feedbacksGrid } from '../data/dummy'
import { Header } from '../components'
import Swal from 'sweetalert2'
const Feedbacks = () => {
  
const [feedbackData, setFeedbackData] = React.useState([]);

React.useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + '/api/forms', {
        headers: {
          'api-key': process.env.REACT_APP_API_KEY
        }
      });
      const data = await response.json();
      // Reverse the array to show latest data first
      setFeedbackData([...data].reverse());
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  fetchData();
}, []);

  return (
    <div className="m-2 md:m-10 sm:mt-24 p-2 md:p-4 bg-white rounded-3xl">
      <Header category="Page" title="Feedbacks" />
      <GridComponent
        dataSource={feedbackData}
        allowPaging
        allowSorting
        toolbar={['Delete']}
        editSettings={{ 
          allowDeleting: true, 
          allowEditing: true
        }}
        width="auto"
        actionBegin={async (args) => {
          if (args.requestType === 'delete') {
            args.cancel = true; // Cancel the default delete operation
            
            const result = await Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
              try {
                const selectedRecords = args.data;
                const deletePromises = selectedRecords.map(record => 
                fetch(`${process.env.REACT_APP_API_BASE_URL}/api/forms/${record._id}`, {
                method: 'DELETE',
                headers: {
                  'api-key': process.env.REACT_APP_API_KEY
                }
                })
              );

              const responses = await Promise.all(deletePromises);
              
              // Check if all deletions were successful
              const allSuccessful = responses.every(response => response.ok);
                if (allSuccessful) {
              // Update the local state after successful deletion
              const deletedIds = selectedRecords.map(record => record._id);
              setFeedbackData(feedbackData.filter(item => !deletedIds.includes(item._id)));
                Swal.fire(
                  'Deleted!',
                  'Your feedback has been deleted.',
                  'success'
                );
                } else {
                  Swal.fire(
                    'Error!',
                    'There was an error deleting the feedback.',
                    'error'
                  );
          }
              } catch (error) {
                console.error('Error deleting feedback:', error);
                Swal.fire(
                  'Error!',
                  'There was an error deleting the feedback.',
                  'error'
                );
              }
            }
          }
        }}
      >
        <ColumnsDirective>
          {feedbacksGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page,  Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  )
}

export default Feedbacks ;