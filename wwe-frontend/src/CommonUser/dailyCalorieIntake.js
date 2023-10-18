import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

/* TODO: This component should show common user's total calories intake in the day.  
*/

function preventDefault(event) {
  event.preventDefault();
}

export default function DailyCalorieIntake() {
  return (
    <React.Fragment>
      <Title>Total Calories Intake</Title>
      <Typography component="p" variant="h4">
        1,800 Cal
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View My Goals
        </Link>
      </div>
    </React.Fragment>
  );
}
