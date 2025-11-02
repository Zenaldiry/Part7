import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNotificationValue } from '../hooks/useNotification';
export default function Notification() {
  const notification = useNotificationValue()
  console.log(notification)
  return (
    <Stack sx={{ width: '100%', display:`${notification.display?notification.display:"none"}`, position:'absolute', marginTop:"60px" }} spacing={2} >
      <Alert  severity={notification.severity}>
      {notification.message}
      </Alert>
    </Stack>
  );
}
